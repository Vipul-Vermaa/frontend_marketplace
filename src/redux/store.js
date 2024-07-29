import {configureStore} from '@reduxjs/toolkit'
import { profileReducer, subscriptionReducer, userReducer } from './reducers/userReducer'
import {inventoryReducer} from './reducers/inventoryReducer'


const store=configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        subscription:subscriptionReducer,
        inventory:inventoryReducer,
    }
})

export default store

export const server='https://marketplace-4e0a.onrender.com/api/v1'