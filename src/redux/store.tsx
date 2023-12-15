//libs
import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import Login from "@/redux/slices/Login.slice";
import Locations from "@/redux/slices/Locations.slice";
import Types from "@/redux/slices/Types.slice";
import Art from "@/redux/slices/Art.slice";
import Portfolio from "@/redux/slices/Portfolio.slice";
import Reviews from "@/redux/slices/Reviews.slice";
import Faq from "@/redux/slices/Faq.slice";
import Prices from "@/redux/slices/Prices.slice";
import Hero from "@/redux/slices/Hero.slice";


const rootReducer = combineReducers({
    Login,
    Types,
    Locations,
    Art,
    Portfolio,
    Reviews,
    Faq,
    Prices,
    Hero
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production'
})
