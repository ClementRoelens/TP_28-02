import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Currency } from "../../models/Currency";
import axios from "axios";
import { API_URL } from "../../config/apiConfig";
import { RootState } from "../../config/store";

export const getAllCurrencies = createAsyncThunk(
    "currency/getAllCurrencies",
    async () => {
        return (await axios.get<Currency[]>(`${API_URL}/currency`)).data;
    }
);

export const getOneCurrency = createAsyncThunk(
    "currency/getOneCurrency",
    async (id:string) => {
        return (await axios.get<Currency>(`${API_URL}/currency/${id}`)).data;
    }
);

const initialState = {
    currencies : [],
    selectedCurrency : null
} as {
    currencies : Currency[],
    selectedCurrency : Currency | null
};

const currencySlice = createSlice({
    name : "currency",
    initialState : initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(getAllCurrencies.fulfilled, (state, action : PayloadAction<Currency[]>) => {
            state.currencies = action.payload;
        }),
        builder.addCase(getAllCurrencies.rejected, (state, action) => {
            console.log(action.error);
        })
    }
});

export default currencySlice.reducer;
export const currencySelector = (state:RootState) => state.currencies;