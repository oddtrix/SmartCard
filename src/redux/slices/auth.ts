import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/http.module";
import { RootState } from "../store";
import { UserLoginDTO, UserSignInDTO } from "../../types/global.typing";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (userData: UserLoginDTO) => {
    const { data } = await axios.post("/Authentication/Login", userData);
    return data;
  }
);
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/Authentication/Me");
  return data;
});
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (userData: UserSignInDTO) => {
    const { data } = await axios.post("/Authentication/Register", userData);
    return data;
  }
);

type User = {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
};

type UserState = {
  data: User | null;
  status: Loading;
};

export enum Loading {
  "Idle",
  "Loading",
  "Loaded",
  "Error",
}

const initialState: UserState = {
  data: null,
  status: Loading.Idle,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending.type]: (state) => {
      state.status = Loading.Loading;
      state.data = null;
    },
    [fetchAuth.fulfilled.type]: (state, action) => {
      state.status = Loading.Loaded;
      state.data = action.payload;
    },
    [fetchAuth.rejected.type]: (state) => {
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
    [fetchRegister.pending.type]: (state) => {
      state.status = Loading.Loading;
      state.data = null;
    },
    [fetchRegister.fulfilled.type]: (state, action) => {
      state.status = Loading.Loaded;
      state.data = action.payload;
    },
    [fetchRegister.rejected.type]: (state) => {
      state.status = Loading.Error;
      state.data = null;
    },
  },
});
export const selectorIsAuth = () =>
  window.localStorage.getItem("token") === null ? false : true;
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
