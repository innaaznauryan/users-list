import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers } from '../db/indexedDB'

const usersFromDB = await getAllUsers()

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: usersFromDB
    },
    reducers: {
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
            state.data = state.data.filter(user => user.id !== payload)
        }
    }
})

export default usersSlice.reducer

export const { createUser, editUser, deleteUser } = usersSlice.actions