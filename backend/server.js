import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import accountRouter from "./routes/accountRoutes.js";
import { notFound, errroHanlder } from "./middleware/errorMiddleware.js";
dotenv.config();
const app = express();

// connecting to MongoDB
connectDb();

app.use(express.json());

//user Routes
app.use("/api/users", userRouter);

//Account Routes
app.use("/api/account", accountRouter);

//middleware for handling 404 requests
app.use(notFound);

// middleware for error handling

app.use(errroHanlder);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`.blue.bold);
});
