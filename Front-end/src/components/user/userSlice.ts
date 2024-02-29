import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../config/store";
import axios from "axios";
import { API_URL } from "../../config/apiConfig";
import { User } from "../../models/User";

export const signIn = createAsyncThunk(
    "user/signIn",
    async (credentials: { email: string, password: string }) => {
        return (await axios.post<User>(`${API_URL}/users/signin`, credentials)).data;
    }
);

export const signUp = createAsyncThunk(
    "user/signUp",
    async (credentials: { email: string, password: string }) => {
        return (await axios.post<User>(`${API_URL}/users/signup`, credentials)).data;
    }
);

export const getCurrencyAmount = createAsyncThunk(
    "user/getCurrencyAmount",
    async (args : {userId: string, currencyId: string}) => {
        return (await axios.get<number>(`${API_URL}/users/getAmount/${args.userId}/${args.currencyId}`)).data;
    }
);

export const transactCurrency = createAsyncThunk(
    "users/transactCurrency",
    async (args : {currencyId : string, buyAmount : number}) => {
        return (await axios.post<number>(`${API_URL}/users/transactCurrency`, args)).data;
    }
);

const initialState = {
    user: null,
    selectedCurrencyAmount : 0
} as {
    user: User | null,
    selectedCurrencyAmount : number
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        activateStoredUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        signout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
            const user: User = action.payload;
            user.password = undefined;
            localStorage.setItem("user", JSON.stringify(user));
            // Plus tard, ce sera un JWT
            state.user = action.payload;
        }),
            builder.addCase(signIn.rejected, (state, action) => {
                console.log(action.error);
            }),
            builder.addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
                const user: User = action.payload;
                user.password = undefined;
                localStorage.setItem("user", JSON.stringify(user));
                // Plus tard, ce sera un JWT
                state.user = action.payload;
            }),
            builder.addCase(signUp.rejected, (state, action) => {
                console.log(action.error);
            }),
            builder.addCase(getCurrencyAmount.fulfilled, (state, action:PayloadAction<number>) => {
                state.selectedCurrencyAmount = action.payload;
            }),
            builder.addCase(getCurrencyAmount.rejected, (state, action) => {
                console.log(action.error);
            }),
            builder.addCase(transactCurrency.fulfilled, (state, action : PayloadAction<number>) => {
                state.selectedCurrencyAmount = action.payload;
            }),
            builder.addCase(transactCurrency.rejected, (state, action) => {
                console.log(action.error);
            })
    }
});

export const { activateStoredUser, signout } = userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state: RootState) => state.users;