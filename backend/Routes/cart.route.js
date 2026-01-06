import express from "express";
import { addtocart,removefromcart,getcart } from "../controllers/cart.controller.js";
import fetchUser from "../middleware/fetchUser.js";


const router = express.Router();
router.use(fetchUser);

router.get("/getcart", getcart);

router.post("/addtocart", addtocart);

router.post("/removefromcart/:productId", removefromcart);

export default router;

