import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './usersSlice'
import loginReducer from './logineSlice'

export const store = configureStore({
    reducer: {
        users: usersReducer, 
        login: loginReducer
    }
})