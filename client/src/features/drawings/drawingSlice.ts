import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IDrawing, Stroke } from '../../../types';

const initialState = {
    drawings: [] as IDrawing[],
    drawing: {} as IDrawing,
};

export const drawingSlice = createSlice({
    name: 'drawing',
    initialState,
    reducers: {
        setDrawings: (state, action) => {
            const drawing = action.payload as IDrawing[];
            state.drawings = drawing;
        },
        setDrawing: (state, action) => {
            const drawing = action.payload as IDrawing;
            state.drawing = drawing;
        },
        editDrawing: (state, action) => {
            const drawing = action.payload as IDrawing;
            const index = state.drawings.findIndex(d => d.id === drawing.id);
            state.drawings[index] = drawing;
        },
        addStroke: (state, action) => {
            const stroke = action.payload as Stroke;
            console.log(stroke);
            state.drawing.strokes.push(stroke);
            console.log(state.drawing.strokes);
        },
        addImg: (state, action) => {
            const img = action.payload as string;
            state.drawing.image = img;
        },
        setScale: (state, action) => {
            const scale = action.payload as number;
            state.drawing.lastState.scale = scale;
        },
        setOffset: (state, action) => {
            const offset = action.payload as [number, number];
            state.drawing.lastState.offset = offset;
        },
        setTool: (state, action) => {
            const tool = action.payload as string;
            state.drawing.lastState.tool = tool;
        },
        removeStroke: (state, action) => {
            console.log('remove stroke');
            const id = action.payload as number;
            const index = state.drawing.strokes.findIndex(s => s.id === id);
            state.drawing.strokes.splice(index, 1);
        }
    }
});

export const { setDrawings, setDrawing, editDrawing, addStroke, addImg, setScale, setOffset, setTool, removeStroke } = drawingSlice.actions;
export default drawingSlice.reducer;
