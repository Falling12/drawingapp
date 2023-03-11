import axios from "axios";

export const client = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

axios.defaults.withCredentials = true;
