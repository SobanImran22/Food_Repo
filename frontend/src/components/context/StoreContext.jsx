import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

   const url = "https://food-repo.onrender.com"; // 👈 your Render backend URL


  // ✅ Fetch food list from backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get("https://food-repo.onrender.com/api/food/list");
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching food list:", error);
      setFoodList([]);
    }
  };

  // ✅ Safe getTotalCartAmount
  const getTotalCartAmount = () => {
    if (!food_list || food_list.length === 0) return 0;
    if (!cartItems || Object.keys(cartItems).length === 0) return 0;

    let totalAmount = 0;
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        const product = food_list.find(
          (p) => String(p._id) === String(itemId)
        );
        if (product && product.price) {
          totalAmount += product.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  // ✅ Add to Cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // ✅ Remove from Cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

 const contextValue = {
  food_list,
  cartItems,
  addToCart,
  removeFromCart,
  getTotalCartAmount,
  token,
  setToken,
  url, // 👈 add this line
};


  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
