import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IDrawing, Stroke, Point } from '../../types'
import { addImg, addStroke, editDrawing, setDrawing } from '../features/drawings/drawingSlice';
import useCreateDrawing from '../hooks/useCreateDrawing';
import { updateDrawing } from '../utils/drawings';

function DrawingCanvas() {
    const drawing = useSelector((state: any) => state.drawings.drawing)
    const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dispatch = useDispatch()
    const [canvasWidth, setCanvasWidth] = useState(window.innerWidth + 100);
    const [canvasHeight, setCanvasHeight] = useState(window.innerHeight + 100);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

    //define canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            setContext(ctx);
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            ctx.lineCap = 'round';
        }
    }, []);

    //draw existing strokes
    useCreateDrawing({
        canvasHeight,
        canvasWidth,
        context,
        drawing,
        isDrawing,
        currentStroke
    })

    //start drawing
    function startStroke(event: React.MouseEvent<HTMLCanvasElement>) {
        const { clientX, clientY } = event;
        const { left, top } = canvasRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
        const x = clientX - left;
        const y = clientY - top;
        const newStroke = {
            points: [{ x, y }],
            color: 'white',
            size: 5,
        };
        setCurrentStroke(newStroke);
        setIsDrawing(true);
    }

    //add points to stroke
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

    //end drawing
    async function endStroke() {
        if (!currentStroke) return;
        console.log(currentStroke)
        dispatch(addStroke(currentStroke))
        dispatch(addImg(canvasRef.current?.toDataURL("image/png") ?? ''))
        setCurrentStroke(null);
        setIsDrawing(false);


        await updateDrawing(drawing)
    }

    //resize canvas
    useEffect(() => {
        function handleResize() {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (ctx) {
                setContext(ctx);
                setCanvasWidth(window.innerWidth);
                setCanvasHeight(window.innerHeight);
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        function handleScroll() {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (ctx) {
                setContext(ctx);
                setCanvasWidth(window.innerWidth + 100);
                setCanvasHeight(window.innerHeight + 100);
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('resize', handleScroll)
    }, [])

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onMouseDown={startStroke}
            onMouseMove={addPoint}
            onMouseUp={endStroke}
            onMouseLeave={endStroke}
            style={{ width: canvasWidth, height: canvasHeight }}
        />
    );
}

export default DrawingCanvas