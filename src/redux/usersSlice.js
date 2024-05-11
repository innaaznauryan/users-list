import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
         setUsers(state, { payload }) {
            return {
                ...state,
                data: payload
            }
        },
        createUser(state, { payload }) {
            return {
                ...state,
                data: state.data.concat(payload)
            }
        },
        editUser(state, { payload }) {
            return {
                ...state,
                data: state.data.map(item => item.id === payload.id ? payload : item)
            }
        },
        deleteUser(state, { payload }) {
            return {
                ...state,
                data: state.data.filter(user => user.id !== payload)
            }
        }
    }
})

export default usersSlice.reducer

export const { setUsers, createUser, editUser, deleteUser } = usersSlice.actions