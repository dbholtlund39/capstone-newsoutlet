import { Router } from "express";
import { healthCheck } from "../controllers/api.controller";

const router = Router();

router.route("/").get(healthCheck);

router.route("/user-profile").get(

)
.post(

)
.put(

)
.delete(

);

export default router;
