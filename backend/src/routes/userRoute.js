import express from "express";
import { Router } from "express";
import {
  getUser,
  getUsers,
  createUser,
  login,
  addToWatchList,
  removeFromWatchList,
} from "../controllers/userController.js";
const router = Router();

router.get("/getUsers", getUsers);
router.get("/getUser/:username", getUser);
router.post("/createUser", createUser);
router.get("/login/:username/:password", login);

// Add stock to watchList
router.post("/addToWatchList", addToWatchList);

// Remove stock from watchList
router.delete("/removeFromWatchList", removeFromWatchList);

export default router;
