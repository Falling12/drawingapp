import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Drawing, User } from '../../../types';

const initialState: User = {
    name: '',
    email: '',
    id: null,
    drawings: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload as User;
            state.name = user.name;
            state.email = user.email;
            state.id = user.id;
            state.drawings = user.drawings;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
