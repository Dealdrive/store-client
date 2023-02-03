import axios from "axios";

const BASE_URL = "https://store-api-3cai.onrender.com/api/"


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWVlYzFmYmRhYTExNDI2Yjg3ODVjMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDU4NzgxMCwiZXhwIjoxNjc0ODQ3MDEwfQ.8-WC8ISs4ImuC364xzvBLbOm0gZq7FEY5IhMKy6HsFw"
//JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).curentUser.accessToken;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})