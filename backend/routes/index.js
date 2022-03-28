import UserController from "../Controllers/UserController.js";
import WalletController from "../Controllers/WalletController.js";
import express from "express";
const router = express.Router();

router.get("/users", UserController.index);
router.get("/user", UserController.view);
router.post("/user", UserController.create);

router.get("/wallets", WalletController.index);
router.get("/wallet", WalletController.view);
router.post("/wallet", WalletController.create);

export default router;
