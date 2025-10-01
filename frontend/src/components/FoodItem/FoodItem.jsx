import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const safeImage = image ? url + "/images/" + image : assets.placeholder;
  const safeName = name || "Unnamed Dish";
  const safeDesc = description || "No description available";
  const safePrice = price || 0;

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img src={safeImage} alt={safeName} className='food-item-image' />

        {/* Safe check for cartItems */}
        {!cartItems || !cartItems[id] ? (
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=''
          />
        ) : (
          <div className='food-item-counter'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=''
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=''
            />
          </div>
        )}
      </div>

      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{safeName}</p>
          <img src={assets.rating_starts} alt='' />
        </div>
        <p className='food-item-desc'>{safeDesc}</p>
        <p className='food-item-price'>${safePrice}</p>
      </div>
    </div>
  );
};

export default FoodItem;
