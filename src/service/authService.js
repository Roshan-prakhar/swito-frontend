import axios from "axios";
import { AUTH_API_URL } from "../config/api";

export const registerUser = async (data) => {
    try {
        const response = await axios.post(
            AUTH_API_URL+"/register",
            data
          );
        return response
    } catch (error) {
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