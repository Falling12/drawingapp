import React, { useState, useEffect, useRef } from 'react'
import { IDrawing, Stroke, Point } from '../../types'

function DrawingCanvas({ drawing: initialDrawing }: { drawing: IDrawing | null}) {
    const [drawing, setDrawing] = useState<IDrawing | null>(initialDrawing);
    const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            setContext(ctx);
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

    function endStroke() {
        if (!currentStroke) return;
        const newDrawing = drawing ? { ...drawing } : { strokes: [], id: 2 };
        newDrawing.strokes.push(currentStroke);
        setDrawing(newDrawing);
        setCurrentStroke(null);
        setIsDrawing(false);

        fetch('http://localhost:3000/draws/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc4NTI1NjY5LCJleHAiOjE2Nzg2MTIwNjl9.zeaDCyF-LK798g-a9JgCjN1bVkUkk663qjy0AdRpDmg'
            },
            body: JSON.stringify(newDrawing)
        })
    }

    const canvasWidth = 600;
    const canvasHeight = 400;

    useEffect(() => {
        if (!context) return;
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        if (!drawing) return;
        drawing.strokes.forEach((stroke) => {
            context.strokeStyle = stroke.color;
            context.lineWidth = stroke.size;
            context.beginPath();
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