import { Router } from "express";
import { healthCheck } from "../controllers/api.controller";
import userRouter from './user';
import authRouter from './auth';


const router = Router();

router.route("/").get(healthCheck);

router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
