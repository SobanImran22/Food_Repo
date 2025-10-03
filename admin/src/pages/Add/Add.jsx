import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Tandori Special"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        // send image to backend upload API
        const uploadRes = await axios.post(`${url}/api/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

        if (uploadRes.data.success) {
          imageUrl = uploadRes.data.url; // Cloudinary URL
        } else {
          toast.error("Image upload failed");
          return;
        }
      }

      // now send product data + image URL to food API
      const response = await axios.post(`${url}/api/food/add`, {
        ...data,
        price: Number(data.price),
        image: imageUrl
      });

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Tandori Special"
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
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
            required
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
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Tandori Special">Tandori Special</option>
              <option value="Pizza's">Pizza's</option>
              <option value="Burger's">Burger's</option>
              <option value="Naan Bread's">Naan Bread's</option>
              <option value="Side's">Side's</option>
              <option value="Curry Dishe's">Curry Dishe's </option>
              <option value="Sizzling Kabab">Sizzling Kabab</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="£20"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
