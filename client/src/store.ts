import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import drawingReducer from "./features/drawings/drawingSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        drawings: drawingReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;