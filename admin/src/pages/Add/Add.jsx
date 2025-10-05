import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Tandori Special",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // Step 1: upload image
      const formData = new FormData();
      formData.append("image", image);

      const uploadRes = await axios.post(
        "https://food-repo.onrender.com/api/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const imageUrl = uploadRes.data.url; // 👈 Cloudinary URL

      // Step 2: save product with image URL
      const response = await axios.post(
        "https://food-repo.onrender.com/api/food/add",
        {
          name: data.name,
          description: data.description,
          price: Number(data.price),
          category: data.category,
          image: imageUrl,
        }
      );

      if (response.data.success) {
        toast.success("Product added successfully ✅");
        setData({
          name: "",
          description: "",
          price: "",
          category: "Tandori Special",
        });
        setImage(false);
      } else {
        toast.error("Failed to add product ❌");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Server error while adding product ❌");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
            >
              <option value="Tandori Special">Tandori Special</option>
              <option value="Pizza's">Pizza's</option>
              <option value="Burger's">Burger's</option>
              <option value="Naan Bread's">Naan Bread's</option>
              <option value="Side's">Side's</option>
              <option value="Rice">Rice</option>
              <option value="Sizzling Kabab">Sizzling Kabab</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="£20"
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
