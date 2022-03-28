import UserController from "../Controllers/UserController.js";
import WalletController from "../Controllers/WalletController.js";
import TransactionController from "../Controllers/TransactionController.js";
import express from "express";
const router = express.Router();

router.get("/users", UserController.index);
router.get("/user", UserController.view);
router.post("/user", UserController.create);

router.get("/wallets", WalletController.index);
router.get("/wallet", WalletController.view);
router.post("/wallet", WalletController.create);

router.get("/transactions", TransactionController.index);
router.get("/transaction", TransactionController.view);
router.post("/transaction", TransactionController.create);

export default router;
