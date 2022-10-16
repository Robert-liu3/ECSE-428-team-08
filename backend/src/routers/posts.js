import express from "express";
import { Router } from "express";
import {getUser} from '../controllers/posts.js'
const router =  new Router();

router.get("/", getUser);

// const users = [];

// router.post("/create_user", (req, res) => {
//     console.log(req.body);
//     const user = req.body;
//     users.push({username: user.username, password: user.password});

//     res.json({loggedIn: true, status: "Everything went well" })

// });

// router.get("/users",(_,res)=> {
//     res.json(users);
// })

// router.delete("/delete", (req,res)=>{
//     const{username, password} = req.body;
// })

export default router;




