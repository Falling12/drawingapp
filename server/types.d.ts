import { Request } from "express";
import { Stroke, Point } from "@prisma/client";

export interface IRequestWithUser extends Request {
    user: {
        id: number;
    }
}

export interface IStroke extends Stroke {
    points: Point[]
}