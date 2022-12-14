import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import postRoutes from './routes/posts.js';
import newsRoutes from './routes/news.js';
import userRouter from './routes/userRoute.js';

export const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded());

/****************************
 Routes for backend endpoints
 ****************************/
app.use('/posts', postRoutes);
app.use('/news', newsRoutes);
app.use('/', userRouter);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.get('/', function (req, res) {
    res.send("Hello from the root application URL");
  });

/**************
 Database setup
 **************/
const CONNECTION_URL = 'mongodb+srv://ecse428_db:passwordecse428@cluster0.k783efm.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log("error"));
