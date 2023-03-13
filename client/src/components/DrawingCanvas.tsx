import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IDrawing, Stroke, Point } from '../../types'
import { addImg, addStroke, editDrawing, setDrawing } from '../features/drawings/drawingSlice';
import { updateDrawing } from '../utils/drawings';

function DrawingCanvas() {
    const drawing = useSelector((state: any) => state.drawings.drawing)
    const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dispatch = useDispatch()

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            setContext(ctx);
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }
    }, []);

    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    function startStroke(event: React.MouseEvent<HTMLCanvasElement>) {
        const { clientX, clientY } = event;
        const { left, top } = canvasRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
        const x = clientX - left;
        const y = clientY - top;
        const newStroke = {
            points: [{ x, y }],
            color: 'black',
            size: 5,
        };
        setCurrentStroke(newStroke);
        setIsDrawing(true);
    }

    function addPoint(event: React.MouseEvent<HTMLCanvasElement>) {
        if (!isDrawing || !currentStroke) return;
        const { clientX, clientY } = event;
        const { left, top } = canvasRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
        const x = clientX - left;
        const y = clientY - top;
        const newPoint = { x, y };
        const newPoints = [...currentStroke.points, newPoint];
        const newStroke = { ...currentStroke, points: newPoints };
        setCurrentStroke(newStroke);
    }

    async function endStroke() {
        if (!currentStroke) return;
        console.log(currentStroke)
        dispatch(addStroke(currentStroke))
        dispatch(addImg(canvasRef.current?.toDataURL("image/png") ?? ''))
        setCurrentStroke(null);
        setIsDrawing(false);

        await updateDrawing(drawing)
    }

    const canvasWidth = 600;
    const canvasHeight = 400;

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

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onMouseDown={startStroke}
            onMouseMove={addPoint}
            onMouseUp={endStroke}
            onMouseLeave={endStroke}
        />
    );
}

export default DrawingCanvas