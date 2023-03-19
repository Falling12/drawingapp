import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IDrawing, Stroke, Point } from '../../types'
import { addImg, addStroke, editDrawing, setDrawing } from '../features/drawings/drawingSlice';
import useCreateDrawing from '../hooks/useCreateDrawing';
import { updateDrawing } from '../utils/drawings';

function DrawingCanvas() {
    const drawing = useSelector((state: any) => state.drawings.drawing)
    const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dispatch = useDispatch()
    const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
    const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [leftMouseDown, setLeftMouseDown] = useState(false);
    const [rightMouseDown, setRightMouseDown] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [prevMouseX, setPrevMouseX] = useState(0);
    const [prevMouseY, setPrevMouseY] = useState(0);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        document.oncontextmenu = function () {
            return false;
        }
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            setContext(ctx);
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            ctx.lineCap = 'round'
        }
    }, []);

    function toScreenX(xTrue: number) {
        return (xTrue + offsetX) * scale;
    }
    function toScreenY(yTrue: number) {
        return (yTrue + offsetY) * scale;
    }
    function toTrueX(xScreen: number) {
        return (xScreen / scale) - offsetX;
    }
    function toTrueY(yScreen: number) {
        return (yScreen / scale) - offsetY;
    }
    function trueHeight() {
        if (canvasRef.current) return canvasRef.current.clientHeight / scale;
        return 0
    }
    function trueWidth() {
        if (canvasRef.current) return canvasRef.current.clientWidth / scale;
        return 0
    }

    function redraw() {
        if (!context) return;
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        if (!drawing) return;
        drawing.strokes.forEach((stroke: Stroke) => {
            drawLine(stroke);
        });
        if (currentStroke) {
            drawLine(currentStroke);
        }
    }

    useEffect(() => {
        if (!context) return;
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        if (!drawing) return;
        drawing.strokes.forEach((stroke: Stroke) => {
            drawLine(stroke);
        });
        if (currentStroke) {
            drawLine(currentStroke);
        }
    }, [drawing, context, canvasWidth, canvasHeight, currentStroke]); 


    function drawLine(stroke: Stroke) {
        if (!context) return;
        context.strokeStyle = stroke.color;
        context.lineWidth = stroke.size;
        context.beginPath();
        if(stroke.points.length === 0) return
        const firstPoint = stroke.points[0];
        context.moveTo(toScreenX(firstPoint.x), toScreenY(firstPoint.y));
        stroke.points.forEach((point) => {
            context.lineTo(toScreenX(point.x), toScreenY(point.y));
        });
        context.stroke();
    }

    //start drawing
    function mouseDown(event: React.MouseEvent<HTMLCanvasElement>) {
        if (event.button === 0) {
            setLeftMouseDown(true);
            setRightMouseDown(false);
        }
        else if(event.button === 2) {
            setRightMouseDown(true);
            setLeftMouseDown(false);
        }

        setMouseX(event.clientX);
        setMouseY(event.clientY);
        setPrevMouseX(event.clientX);
        setPrevMouseY(event.clientY);

        redraw();
    }

    //add points to stroke
    function onMouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
        setMouseX(event.pageX);
        setMouseY(event.pageY);
        const scaledX = toTrueX(event.pageX);
        const scaledY = toTrueY(event.pageY);

        if(leftMouseDown) {
            if(!currentStroke) {
                const newStroke: Stroke = {
                    color: 'white',
                    size: 5,
                    points: []
                }
                setCurrentStroke(newStroke);
            }
            if(!currentStroke) return;
            const newPoint = { x: scaledX, y: scaledY };
            const newPoints = [...currentStroke.points, newPoint];
            const newStroke = { ...currentStroke, points: newPoints };
            setCurrentStroke(newStroke);
            redraw();
        }

        if(rightMouseDown) {
            setOffsetX(offsetX + (mouseX - prevMouseX) / scale);
            setOffsetY(offsetY + (mouseY - prevMouseY) / scale);
            redraw();
        }

        setPrevMouseX(mouseX);
        setPrevMouseY(mouseY);
    }

    function onMouseWheel(event: React.WheelEvent<HTMLCanvasElement>) {
        const deltaY = event.deltaY;
        const scaleAmount = -deltaY / 500;
        if((scale * (1 + scaleAmount) - 1) * 100 < -99) return
        setScale(scale * (1 + scaleAmount));

        // console log the scale amount in percentage
        console.log((scale * (1 + scaleAmount) - 1) * 100);


        // zoom the page based on where the cursor is
        if(!canvasRef.current) return;
        var distX = event.pageX / canvasRef.current.clientWidth;
        var distY = event.pageY / canvasRef.current.clientHeight;

        // calculate how much we need to zoom
        const unitsZoomedX = trueWidth() * scaleAmount;
        const unitsZoomedY = trueHeight() * scaleAmount;

        const unitsAddLeft = unitsZoomedX * distX;
        const unitsAddTop = unitsZoomedY * distY;

        setOffsetX(offsetX - unitsAddLeft);
        setOffsetY(offsetY - unitsAddTop);

        redraw();
    }

    //end drawing
    async function onMouseUp(event: React.MouseEvent<HTMLCanvasElement>) {
        setRightMouseDown(false);
        if (!currentStroke) return;
        setLeftMouseDown(false);
        dispatch(addStroke(currentStroke))
        dispatch(addImg(canvasRef.current?.toDataURL("image/png") ?? ''))
        setCurrentStroke(null);
        redraw();

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

    return (
        <canvas
            className='absolute z-[3]'
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onMouseDown={mouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseOut={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={onMouseWheel}
            style={{ width: canvasWidth, height: canvasHeight, cursor: rightMouseDown ? 'grabbing' : '' }}
        />
    );
}

export default DrawingCanvas