import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import allowanceRoutes from "./routes/allowanceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dbConnect from "./config/db.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

dbConnect()

app.use("/allowances", allowanceRoutes);
app.use("/user",userRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the Travel Allowance API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
