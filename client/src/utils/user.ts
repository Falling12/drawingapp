import { client } from "../api";
import type { IDrawing, User } from "../../types";
import axios from "axios";

export const login = async(data: {
    email: string;
    password: string;
}) => {
    const response = await client.post("/user/login", data);
    return response.data;
}

export const getUser = async() => {
    const response = await client.get("/user/me");
    return response.data;
}