import { Router } from "express";
import { healthCheck } from "../controllers/api.controller";
import userRouter from './user';


const router = Router();

router.route("/").get(healthCheck);

router.use("/users", userRouter);

export default router;
