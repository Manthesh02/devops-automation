import express from "express";
import {getTransactions,postTransaction} from "../controllers/controllers.js";
import{verifyToken} from "../middlewares/auth.js"
const router = express.Router();

router.post("/createTransaction",verifyToken,postTransaction);

router.get("/getTransactions",verifyToken,getTransactions);

export default router;
