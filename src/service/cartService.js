import axios from "axios";
import { CART_API_URL } from "../config/api";

export const addToCart = async (foodId, token) => {
    try {
        console.log("Cart Service - Adding to cart:", foodId);
        console.log("Cart Service - Token:", token ? token.substring(0, 20) + "..." : "null");
        console.log("Cart Service - API URL:", CART_API_URL);
        
        const response = await axios.post(
            CART_API_URL,
            { foodId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        console.log("Cart Service - Add to cart successful:", response.status);
    } catch (error) {
        console.error('Error while adding the cart data', error);
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
        }
    }
}

export const removeQtyFromCart = async (foodId, token) => {
    try {
        await axios.post(
            CART_API_URL+"/remove",
            { foodId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
    } catch (error) {
        console.error('Error while removing qty from cart', error);
    }
}

export const getCartData = async (token) => {
    try {
        console.log("Cart Service - Getting cart data");
        console.log("Cart Service - Token:", token ? token.substring(0, 20) + "..." : "null");
        console.log("Cart Service - API URL:", CART_API_URL);
        
        const response = await axios.get(CART_API_URL, {
            headers: { Authorization: `Bearer ${token}` },
          });
        console.log("Cart Service - Get cart successful:", response.status);
        return response.data.items;
    } catch (error) {
        console.error('Error while fetching the cart data', error);
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
        }
    }
}

export const clearCartItems = async (token, setQuantities) => {
    try {
        await axios.delete(CART_API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setQuantities({});
    } catch (error) {
        console.error('Error while clearing the cart', error);
        throw error;
    }
}

