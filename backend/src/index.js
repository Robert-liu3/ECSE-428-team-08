import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import errorHandler from "errorHandler";
import user_routes from "./src/routes/user.js";

const app = express();

const isProduction = process.env.NODE_ENV === "production";

app.use("/user", user_routes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://ecse428_db:passwordecse428@cluster0.k783efm.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

if (!isProduction) {
  app.use(errorHandler);
}

// Catch Error 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err); // forward to error handler
});

// if in development, print stacktrace of the error
if (!isProduction) {
    app.use((err, req, res, next) => {
        console.log(err.stack); // display the error logs

        res.status(err.status || 500); // set the status of the error to 500 if none are present

        res.json({'errors': {
            message: err.message,
            error: err
        }})
    });
}

if (isProduction) { // Don't leak the error stacktrace to user
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({'errors': {
            message: err.message,
            error: {}
        }})
    })
}

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// Other error handlers
if (isProduction) {
  mongoose
    .connect(CONNECTION_URL, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    )
    .catch((error) => console.log("error"));
} else {
  mongoose.connect("mongodb://localhost/conduit");
  mongoose.set("debug", true);
}
