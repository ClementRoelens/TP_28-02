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

export const seekCurrency = createAsyncThunk(
    "currency/seekCurrency",
    async (seekedValue : string) => {
        return (await axios.get<Currency[]>(`${API_URL}/currency/seekCurrency/${seekedValue}`)).data;
    }
);

export const getLastSelectedCurrencyRate = createAsyncThunk(
    "currency/getLastSelectedCurrencyRate",
    async (currencyId : string) => {
        return (await axios.get<number>(`${API_URL}/currency/getLastSelectedCurrencyRate/${currencyId}`)).data;
    }
);

const initialState = {
    currencies : [],
    selectedCurrency : null,
    selectedCurrencyRate : 0
} as {
    currencies : Currency[],
    selectedCurrency : Currency | null,
    selectedCurrencyRate : number
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
        }),
        builder.addCase(getOneCurrency.fulfilled, (state, action:PayloadAction<Currency>) => {
            state.selectedCurrency = action.payload;
        }),
        builder.addCase(getOneCurrency.rejected, (state, action) => {
            console.log(action.error);
        }),
        builder.addCase(seekCurrency.fulfilled, (state, action:PayloadAction<Currency[]>) => {
            state.currencies = action.payload;
        }),
        builder.addCase(seekCurrency.rejected, (state, action) => {
            console.log(action.error);
        }),
        builder.addCase(getLastSelectedCurrencyRate.fulfilled, (state, action: PayloadAction<number>) => {
            state.selectedCurrencyRate = action.payload;
        }),
        builder.addCase(getLastSelectedCurrencyRate.rejected, (state, action) => {
            console.log(action.error);
        })
    }
});

export default currencySlice.reducer;
export const currencySelector = (state:RootState) => state.currencies;