import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { DB_URL } from "./config/db.config";
import { API_URL, PORT } from "./config/app.config";
import router from "./routes";
import userRouter from "./routes/user";
import path from "path";


mongoose
  .connect(DB_URL)
  .then(() => console.log("[Database] Connection established."))
  .catch((err) => console.log("[Database] Connection failed: ", err));

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(API_URL, router);
app.use(API_URL, userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")))
  app.all("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "../../client/dist/index.html"))
  })
}

app.listen(PORT, () =>
  console.log(`[Server] Listening for requests at http://localhost:${PORT}`)
);
