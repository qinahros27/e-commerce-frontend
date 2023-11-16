import { configureStore } from "@reduxjs/toolkit";
import {  persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from "./reducers/productsReducer";
import userReducer from "./reducers/userReducer";
import categoriesReducer from "./reducers/categoryReducer";
import cartReducer from "./reducers/cartReducer";

const persistConfig = {
    timeout: 1000, 
    key: 'root', // Root key for the persisted state
    storage, 
    version:1 
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        productsReducer,
        userReducer: persistedUserReducer,
        categoriesReducer,
        cartReducer: persistedCartReducer,
    },
    preloadedState: {
        productsReducer: {
            products: [],
            productDetail: {
                id: 0,
                title: '',
                price: 0,
                description: '',
                category: {
                  id: 0,
                  name: '',
                  image: ''
                } ,
                images: []
            },
            product: {
                title: '',
                price: 0,
                description: '',
                categoryId: 0,
                images: []
            },
            deleteResponse: false,
            loading: false,
            error: ""
        },
        categoriesReducer: {
            categories: [],
            deleteResponse: false,
            loading: false,
            error: ""
        }
    }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export default store;