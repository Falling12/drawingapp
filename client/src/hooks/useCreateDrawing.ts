import { useEffect } from "react";
import { IDrawing, Stroke } from "../../types";


export default ({
    context,
    canvasHeight,
    canvasWidth,
    drawing,
    isDrawing,
    currentStroke,
}: {
    context: CanvasRenderingContext2D | null,
    canvasHeight: number,
    canvasWidth: number,
    drawing: IDrawing,
    isDrawing: boolean,
    currentStroke: Stroke | null,
}) => {
    useEffect(() => {
        if (!context) return;
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        if (!drawing) return;
        drawing.strokes.forEach((stroke: Stroke) => {
            context.strokeStyle = stroke.color;
            context.lineWidth = stroke.size;
            context.beginPath();
            if(stroke.points.length === 0) return
            const firstPoint = stroke.points[0];
            context.moveTo(firstPoint.x, firstPoint.y);
            stroke.points.forEach((point) => {
                context.lineTo(point.x, point.y);
            });
            context.stroke();
        });
        if (isDrawing && currentStroke) {
            context.strokeStyle = currentStroke.color;
            context.lineWidth = currentStroke.size;
            context.beginPath();
            const firstPoint = currentStroke.points[0];
            context.moveTo(firstPoint.x, firstPoint.y);
            currentStroke.points.forEach((point) => {
                context.lineTo(point.x, point.y);
            });
            context.stroke();
        }
    }, [drawing, context, canvasWidth, canvasHeight, isDrawing, currentStroke]); 
}