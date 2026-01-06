import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { backendUrl } from "../../App";
import { supabase } from "../../supabase";

export const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    // 🔹 Upload image to Supabase
    const uploadImageToSupabase = async (imageFile) => {
        const fileName = `${Date.now()}-${imageFile.name}`;

        const { error } = await supabase.storage
            .from("product-images")
            .upload(fileName, imageFile);

        if (error) {
            console.error("Supabase upload error:", error.message);
            return null;
        }

        const { data } = supabase.storage
            .from("product-images")
            .getPublicUrl(fileName);

        return data.publicUrl;
    };

    const Add_Product = async () => {
        if (!image) {
            alert("Please select an image");
            return;
        }

        try {
            setLoading(true);

            // 1️⃣ Upload image
            const imageUrl = await uploadImageToSupabase(image);
            if (!imageUrl) {
                alert("Image upload failed");
                return;
            }

            // 2️⃣ Create product object
            const product = {
                ...productDetails,
                image: imageUrl,
            };

            // 3️⃣ Save product to backend
            const response = await fetch(
                `${backendUrl}/api/product/addproduct`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.getItem("token"),
                    },
                    body: JSON.stringify(product),
                }
            );

            const data = await response.json();
            data.success ? alert("Product Added") : alert("Failed");
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text"
                    name="name"
                    placeholder="Type here"
                />
            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type="text"
                        name="old_price"
                        placeholder="Type here"
                    />
                </div>

                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type="text"
                        name="new_price"
                        placeholder="Type here"
                    />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className="add-product-selector"
                >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>

            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img
                        src={image ? URL.createObjectURL(image) : upload_area}
                        alt=""
                        className="addproduct-thumbnail-img"
                    />
                </label>
                <input
                    onChange={imageHandler}
                    type="file"
                    id="file-input"
                    hidden
                    accept="image/*"
                />
            </div>

            <button
                onClick={Add_Product}
                className="addproduct-btn"
                disabled={loading}
            >
                {loading ? "ADDING..." : "ADD"}
            </button>
        </div>
    );
};
