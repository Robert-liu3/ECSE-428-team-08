import express from 'express';
import { Router } from "express";
import {getUser, getUsers, createUser, login, deleteUser} from '../controllers/userController.js'
const router = Router();

router.get("/getUsers", getUsers);
router.get("/getUser/:username", getUser);
router.post("/createUser", createUser)
router.get("/login/:username/:password", login)
router.delete("/deleteUser", deleteUser)



export default router