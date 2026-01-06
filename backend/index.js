import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import userRouter from "./Routes/user.route.js";
import adminRouter from "./Routes/admin.route.js";
import productRouter from "./Routes/product.route.js";
import cartRouter from "./Routes/cart.route.js";
import paymentRouter from "./Routes/payment.route.js";
import orderRouter from "./Routes/order.route.js";
import adminOrderRouter from "./Routes/adminOrder.route.js";
import {Product} from "./models/product.js"
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const port = Number(process.env.PORT) || 4000;
// Database connection with mongoDB
mongoose.connect(`${process.env.MONGODB_URI}/Shopper`);

//API CREATION

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating Upload Endpoint For Images

app.use('/images',express.static('upload/images'))

app.post("/upload", upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})



app.use("/api/user", userRouter);
app.use("/api/adminlogin", adminRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/orderuser", orderRouter);
app.use("/api/admin",adminOrderRouter);



app.get("/allproducts", async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    return res.send(products);
})


app.get("/newcollections", async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

app.get("/popularinwomen", async (req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("popular in women fetched");
    res.send(popular_in_women);
})

