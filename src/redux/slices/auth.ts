import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/http.module";
import { RootState } from "../store";
import { UserLoginDTO } from "../../types/global.typing";

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
  async (params) => {
    const { data } = await axios.post("/Authentication/Register", params);
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
  status: string;
};

const initialState: UserState = {
  data: null,
  status: "loading",
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
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled.type]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuth.rejected.type]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchAuthMe.pending.type]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuthMe.fulfilled.type]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchAuthMe.rejected.type]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [fetchRegister.pending.type]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchRegister.fulfilled.type]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },
    [fetchRegister.rejected.type]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});
export const selectorIsAuth = (state: RootState) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
