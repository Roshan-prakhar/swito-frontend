import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../service/foodService";
import axios from "axios";
import {
  addToCart,
  getCartData,
  removeQtyFromCart,
} from "../service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState("");

  const increaseQty = async (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
    await addToCart(foodId, token);
  };

  const decreaseQty = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,
    }));
    await removeQtyFromCart(foodId, token);
  };

  const removeFromCart = (foodId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantitites = { ...prevQuantities };
      delete updatedQuantitites[foodId];
      return updatedQuantitites;
    });
  };

  const loadCartData = async (token) => {
    console.log("StoreContext - Loading cart data with token:", token ? token.substring(0, 20) + "..." : "null");
    try {
      const items = await getCartData(token);
      console.log("StoreContext - Cart data loaded successfully:", items);
      setQuantities(items);
    } catch (error) {
      console.error("StoreContext - Error loading cart data:", error);
      // Set empty cart on error to prevent crashes
      setQuantities({});
    }
  };

  const contextValue = {
    foodList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
    token,
    setToken,
    setQuantities,
    loadCartData,
  };

  useEffect(() => {
    async function loadData() {
      console.log("StoreContext - Starting data load...");
      try {
        const data = await fetchFoodList();
        console.log("StoreContext - Food list loaded:", data.length, "items");
        setFoodList(data);
        
        const storedToken = localStorage.getItem("token");
        console.log("StoreContext - Token from localStorage:", storedToken ? storedToken.substring(0, 20) + "..." : "null");
        
        if (storedToken) {
          setToken(storedToken);
          await loadCartData(storedToken);
        } else {
          console.log("StoreContext - No token found, skipping cart load");
        }
      } catch (error) {
        console.error("StoreContext - Error in loadData:", error);
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
