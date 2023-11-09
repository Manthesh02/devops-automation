import express from "express";
import https from "http";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import connectToMongoDB from "./db.js";
import Transaction from "./src/models/Transaction.js";
dotenv.config();

const port = process.env.PORT || 5003;

const app = express();

app.use(express.json());

app.use(cors());

connectToMongoDB();

app.use("/api/auth", authRoutes);
app.use("/api/transaction",transactionRoutes);


const server = https.createServer(app);


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
