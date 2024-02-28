import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Exchange } from "../../models/Exchange";
import axios from "axios";
import { API_URL } from "../../config/apiConfig";
import { RootState } from "../../config/store";


export const getAllExchangesOnOneCurrency = createAsyncThunk(
    "exchange/getAllExchangesOnOneCurrency",
    async (currencyId: string) => {
        return (await axios.get<Exchange[]>(`${API_URL}/exchanges/getAllOnOneCurrency/${currencyId}`)).data;
    }
);

export const getLastExchangeOnOneCurrency = createAsyncThunk(
    "exchange/getLastExchangeOnOneCurrency",
    async (currencyId: string) => {
        return (await axios.get<Exchange>(`${API_URL}/exchanges/getLastOnOneCurrency/${currencyId}`)).data;
    }
);

const initialState = {
    exchanges: [],
    selectedExchange : null
} as {
    exchanges: Exchange[],
    selectedExchange : Exchange | null
};

const exchangeSlice = createSlice({
    name: "exchange",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllExchangesOnOneCurrency.fulfilled, (state, action: PayloadAction<Exchange[]>) => {
            state.exchanges = action.payload;
        }),
            builder.addCase(getAllExchangesOnOneCurrency.rejected, (state, action) => {
                console.log(action.error);
            }),
            builder.addCase(getLastExchangeOnOneCurrency.fulfilled, (state, action : PayloadAction<Exchange>) => {
                state.selectedExchange = action.payload;
            }),
            builder.addCase(getLastExchangeOnOneCurrency.rejected, (state, action) => {
                console.log(action.error);
            })
    }
});

export default exchangeSlice.reducer;
export const exchangeSelector = (state: RootState) => state.exchanges;