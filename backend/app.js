import express from "express";
import dotevn from "dotenv";
import userRouter from "./routes/user-routes.js";
import postRouter from "./routes/post-routes.js";
import cors from "cors";

export const app = express();
dotevn.config({
  path: "./data/config.env",
});

//Middlewares
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/user", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hello From Kubree!");
});
