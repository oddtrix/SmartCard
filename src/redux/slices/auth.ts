import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/http.module";
import { IUserState, Loading } from "../../types/global.typing";
import { IUserLoginDTO, IUserSignInDTO } from "../../types/user.typing";

export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (userData: IUserLoginDTO) => {
    const { data } = await axios.post("api/Authentication/Login", userData);
    return data;
  }
);
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("api/Authentication/Me");
  return data;
});
export const RegisterUser = createAsyncThunk(
  "auth/RegisterUser",
  async (userData: IUserSignInDTO) => {
    const { data } = await axios.post("api/Authentication/Register", userData);
    return data;
  }
);

const initialState: IUserState = {
  data: null,
  status: Loading.Idle,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = Loading.Idle;
    },
  },
  extraReducers: {
    [LoginUser.pending.type]: (state) => {
      state.status = Loading.Loading;
      state.data = null;
    },
    [LoginUser.fulfilled.type]: (state, action) => {
      state.status = Loading.Loaded;
      state.data = action.payload;
    },
    [LoginUser.rejected.type]: (state) => {
      state.status = Loading.Error;
      state.data = null;
    },
    [fetchAuthMe.pending.type]: (state) => {
      state.status = Loading.Loading;
      state.data = null;
    },
    [fetchAuthMe.fulfilled.type]: (state, action) => {
      state.status = Loading.Loaded;
      state.data = action.payload;
    },
    [fetchAuthMe.rejected.type]: (state) => {
      state.status = Loading.Error;
      state.data = null;
    },
    [RegisterUser.pending.type]: (state) => {
      state.status = Loading.Loading;
      state.data = null;
    },
    [RegisterUser.fulfilled.type]: (state, action) => {
      state.status = Loading.Success;
      state.data = action.payload;
    },
    [RegisterUser.rejected.type]: (state) => {
      state.status = Loading.Error;
      state.data = null;
    },
  },
});
export const selectorIsAuth = () =>
  window.localStorage.getItem("token") === null ? false : true;
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
