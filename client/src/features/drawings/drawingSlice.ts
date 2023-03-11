import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IDrawing } from '../../../types';

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
            drawing.forEach(d => (
                state.drawings.push(d)
            ));
        },
        setDrawing: (state, action) => {
            const drawing = action.payload as IDrawing;
            state.drawing = drawing;
        }
    }
});

export const { setDrawings, setDrawing } = drawingSlice.actions;
export default drawingSlice.reducer;
