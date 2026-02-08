import axios from "axios";
import { AUTH_API_URL } from "../config/api";

export const registerUser = async (data) => {
    try {
        console.log("Register URL:", AUTH_API_URL+"/register");
        console.log("API Base URL:", import.meta.env.VITE_API_URL);
        const response = await axios.post(
            AUTH_API_URL+"/register",
            data
          );
        return response
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
}

export const login = async (data) => {
    try {
        const response = await axios.post(AUTH_API_URL+"/login", data);
        return response;
    } catch (error) {
        throw error;
    }
}