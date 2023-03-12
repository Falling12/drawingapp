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

export const updateDrawing = async(drawing: IDrawing) => {
    const response = await client.post(`/draws/`, drawing);
    return response.data;
}

export const createDrawing = async(name: string) => {
    const response = await client.post(`/draws/new`, { name });
    return response.data;
}

export const deleteDrawing = async(id: number | null) => {
    const response = await client.delete(`/draws/${id}`);
    return response.data;
}