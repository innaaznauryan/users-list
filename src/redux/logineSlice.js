import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        'isLoggedIn': !!localStorage.user
    },
    reducers: {
        loginUser(state, { payload }) {
            state.isLoggedIn = payload
        }
    }
})

export default loginSlice.reducer

export const { loginUser } = loginSlice.actions