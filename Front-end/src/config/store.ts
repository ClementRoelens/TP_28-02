import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../components/user/userSlice";
import currencySlice from "../components/currency/currencySlice";
import exchangeSlice from "../components/exchange/exchangeSlice";

export const store = configureStore({
    reducer : {
        users : userSlice,
        currencies : currencySlice,
        exchanges : exchangeSlice
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;