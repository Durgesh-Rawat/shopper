import express from "express";
import { createorder,verify} from "../controllers/payment.controller.js";


const router = express.Router();

router.post("/createorder", createorder);
router.post("/verify", verify);

export default router;