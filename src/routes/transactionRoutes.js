import express from "express";
import {initiatePayment,verifyPayment} from "../controllers/controllers.js";
import{verifyToken} from "../middlewares/auth.js"
const router = express.Router();

router.post("/initiateTransaction",verifyToken,initiatePayment);

router.get("/getTransactions",verifyToken,verifyPayment);

export default router;
