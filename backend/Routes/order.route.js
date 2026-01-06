import express from "express";
import { order,getorder } from "../controllers/order.controller.js";
import fetchUser from "../middleware/fetchUser.js";

const router = express.Router();

router.use(fetchUser);

router.post("/order", order);

router.get("/getorder", getorder);

export default router;