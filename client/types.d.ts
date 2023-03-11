export interface User {
    id: number | null;
    name: string;
    email: string;
    drawings: Drawing[];
}

export interface Point {
    x: number;
    y: number;
}

export interface Stroke {
    points: Point[];
    color: string;
    size: number;
}

export interface Drawing {
    strokes: Stroke[];
    id: number
}