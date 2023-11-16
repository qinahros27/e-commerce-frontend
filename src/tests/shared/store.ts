import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../../redux/reducers/productsReducer";
import userReducer from "../../redux/reducers/userReducer";
import categoriesReducer from "../../redux/reducers/categoryReducer";
import cartReducer from "../../redux/reducers/cartReducer";

const store = configureStore({
    reducer: {
        productsReducer,
        userReducer,
        categoriesReducer,
        cartReducer
    }
})

export default store