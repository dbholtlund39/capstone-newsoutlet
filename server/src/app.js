import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { DB_URL } from "./config/db.config";
import { API_URL, PORT } from "./config/app.config";
import router from "./routes";
import userRouter from "./routes/user";
import path from "path";

const fetch = require("node-fetch");
const apiKey = "8cc2063285f3470b96ff200384478e9b";

const app = express();

app.use(cors({ origin: 'http://3.15.225.91' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/:countryCode", async (req, res) => {
  try {
    const { countryCode } = req.params;

    const apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=${countryCode}&category=general&pageSize=5`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    res.setHeader("Content-Type", "application/json");
    res.json(data.articles || []);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Error fetching news" });
  }
});

mongoose
  .connect(DB_URL)
  .then(() => console.log("[Database] Connection established."))
  .catch((err) => console.log("[Database] Connection failed: ", err));

app.use(API_URL, router);
app.use(API_URL, userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.all("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "../../client/dist/index.html"));
  });
}

app.listen(PORT, () =>
  console.log(`[Server] Listening for requests at http://localhost:${PORT}`)
);