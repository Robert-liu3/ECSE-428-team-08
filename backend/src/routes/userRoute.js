import express from 'express';
import { Router } from "express";
import {getUser, getUsers, createUser, login} from '../controllers/userController.js'
const router = Router();

router.get("/getUsers", getUsers);
router.get("/getUser/:username", getUser);
router.post("/createUser", createUser)
router.get("/login/:username/:password", login)


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

export default router