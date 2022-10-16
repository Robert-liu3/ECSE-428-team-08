import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js"
import postRoutes from './routes/userRoute.js';

const app = express();
app.use(express.json()); 
app.use(express.urlencoded());
app.use(userRouter);


// app.listen(5000, ()=>{
// console.log("sever started on 5000")});



app.use('/posts', postRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());



// connect to database


const CONNECTION_URL = 'mongodb+srv://ecse428_db:passwordecse428@cluster0.k783efm.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log("error"));