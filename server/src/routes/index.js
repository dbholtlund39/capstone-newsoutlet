import { Router } from "express";
import { healthCheck } from "../controllers/api.controller";

const router = Router();

router.route("/").get(healthCheck);


router.route("/local-news").get(

);


router.route("/national-news").get(

);


router.route("/world-news").get(

);


router.route("/sports").get(

);


router.route("/weather").get(

);


router.route("/user-profile").get(

)
.post(

)
.put(

)
.delete(

);

export default router;
