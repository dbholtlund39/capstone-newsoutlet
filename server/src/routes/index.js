import { Router } from "express";
import { healthCheck } from "../controllers/api.controller";
import userRouter from './user';
import authRouter from './auth';
import scraperRouter from './scraper.routes';

const router = Router();

router.route("/").get(healthCheck);


router.use("/users", userRouter);
router.use("/auth", authRouter);

// Use the updated scraper route with the new endpoint
router.use("/sportsNews", scraperRouter);

export default router;