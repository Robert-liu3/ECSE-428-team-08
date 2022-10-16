import express from 'express';
import { Router } from "express";
import {getUser} from '../controllers/posts.js'
const router = Router();

router.get("/", getUser);

router.get('/', (req, res) => {
    res.send('THIS WORKS');
});

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