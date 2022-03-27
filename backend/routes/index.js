import UserController from "../Controllers/UserController.js";
import express from "express";
const router = express.Router();

router.get("/users", UserController.index);
router.get("/user", UserController.view);
router.post("/user", UserController.create);

export default router;
