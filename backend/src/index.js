import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js"


export const app = express();
app.use(cors()); // CORS policy
app.use(express.json()); 
app.use(express.urlencoded());
app.use('/', userRouter);




// header('Access-Control-Allow-Origin: *')
// header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE')
// header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization')
// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }




// app.listen(5000, ()=>{
// console.log("sever started on 5000")});





app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));




// connect to database


const CONNECTION_URL = 'mongodb+srv://ecse428_db:passwordecse428@cluster0.k783efm.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log("error"));

