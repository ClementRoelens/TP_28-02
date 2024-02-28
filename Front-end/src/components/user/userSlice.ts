import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../config/store";
import axios from "axios";
import { API_URL } from "../../config/apiConfig";
import { User } from "../../models/User";

export const signIn = createAsyncThunk(
    "user/signIn",
    async (user: User) => {
        const response = await axios.post<User>(`${API_URL}/users/signin`, {
            email : user.email ,
            password : user.password
        } );
        return response.data;
    }
);

const initialState = {
    user: null
} as {
    user: User | null
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        activateStoredUser : (state, action : PayloadAction<User>) => {
            state.user = action.payload;
        },
        signout : (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            state.user = action.payload;
        }),
        builder.addCase(signIn.rejected, (state, action) => {
            console.log(action.error);
        })
    }
});

export const { activateStoredUser, signout } = userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state: RootState) => state.users;