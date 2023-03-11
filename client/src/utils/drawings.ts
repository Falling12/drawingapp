import { client } from "../api";
import type { IDrawing, User } from "../../types";
import axios from "axios";

export const getDrawings = async() => {
    const response = await client.get("/draws");
    return response.data;
}

export const getDrawing = async(id: number) => {
    const response = await client.get(`/draws/${id}`);
    return response.data;
}