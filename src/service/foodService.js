import axios from "axios";
import { FOOD_API_URL } from "../config/api";

export const fetchFoodList = async () => {
    try {
        const response = await axios.get(FOOD_API_URL);
        return response.data;
    } catch (error) {
        console.log('Error fetching food list:', error);
        throw error;
    }    
}

export const fetchFoodDetails = async (id) => {
    try {
        const response = await axios.get(FOOD_API_URL+"/"+id);
        return response.data;
    } catch (error) {
        console.log('Error fetching food details:', error);
        throw error;
    }
    
}