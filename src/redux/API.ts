import axios from "axios";
import {LoginFormInputs} from "@/types";

export const BASE_URL = "https://api.honest-photography.com/api/v1"
export const TOKEN = typeof localStorage != 'undefined' && JSON.parse(localStorage.getItem("accessHonestPhoto")!);
export const guestInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

export const adminInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Authorization" : `Bearer ${TOKEN?.token}`
    }
})


export const API = {
    async login(userData: LoginFormInputs) {
        const response = await guestInstance.post("/token/", userData);
        return response.data;
    },
    async refreshToken(payload: {refresh: string}) {
        const response = await guestInstance.post("/token/refresh/", payload);
        return response.data;
    }
}
