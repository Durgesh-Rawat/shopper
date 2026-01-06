import express from "express";
import { addproduct,removeproduct} from "../controllers/product.controller.js";
import adminAuth from "../middleware/adminAuth.js";


const router = express.Router();
router.use(adminAuth);

// router.get("/allproducts", allproducts);

router.post("/addproduct", addproduct);

router.post("/removeproduct", removeproduct);

export default router;