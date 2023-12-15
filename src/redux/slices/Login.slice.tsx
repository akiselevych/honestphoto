//libs
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {LoginFormInputs} from "@/types";
import {API} from "@/redux/API";
import {tokenSetters} from "@/utils/tokenSetters";

type InitialStateType = {
    isLoginLoading:boolean,
    isLoginError: boolean,
    isLogged: boolean
}
const initialState: InitialStateType = {
    isLoginLoading: false,
    isLoginError: false,
    isLogged: false,
}

export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (userData: LoginFormInputs) => {
        try {
            const response = await API.login(userData);
            tokenSetters(response.access, response.refresh)
        } catch (e){
            return "error"
        }
    }
)

export const refreshToken = createAsyncThunk(
    "login/refreshToken",
    async (token: string) => {
        try {
            const response = await API.refreshToken({refresh: token});
            tokenSetters(response.access, response.refresh);
        } catch (e){
            return "error"
        }
    }
)

export const Login = createSlice({
    name: "Login",
    initialState,
    reducers: {
        setIsLogged: (state, {payload}) => {
            state.isLogged = payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoginLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, {payload}) => {
            if (payload == "error"){
                state.isLoginError = true;
            } else {
                state.isLoginError = false;
                state.isLogged = true;
            }
            state.isLoginLoading = false;
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.isLoginLoading = false;
            state.isLoginError = true;
        });
        builder.addCase(refreshToken.pending, (state) => {
            state.isLoginLoading = true;
            state.isLoginError = false;
        });
        builder.addCase(refreshToken.fulfilled, (state, {payload}) => {
            if (payload !== "error"){
                state.isLogged = true;
            } else {
                state.isLoginError = true;
            }
            state.isLoginLoading = false;
        });
        builder.addCase(refreshToken.rejected, (state) => {
            state.isLoginError = true;
        });
    }
})

const {reducer, actions} = Login;

export const {setIsLogged} = actions;
export default reducer;