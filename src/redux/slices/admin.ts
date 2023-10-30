import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../helpers/http.module";
import { IAdminState, Loading } from "../../types/global.typing";
import { IAdminUser } from "../../types/admin.typing";
import { IUserId } from "../../types/user.typing";

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const token = window.localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { data } = await axios.get("/Admin/GetUsers", { headers });
  return data;
});

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId: IUserId) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = {
      id: userId.id,
    };
    await axios.delete(`/Admin/DeleteUser`, { headers, data });
  }
);
const initialState: IAdminState = {
  users: {
    items: [],
    status: Loading.Idle,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.type]: (state: IAdminState) => {
      state.users.items = [];
      state.users.status = Loading.Loading;
    },
    [fetchUsers.fulfilled.type]: (
      state: IAdminState,
      action: PayloadAction<IAdminUser[], string>
    ) => {
      state.users.items = action.payload;
      state.users.status = Loading.Loaded;
    },
    [fetchUsers.rejected.type]: (state: IAdminState) => {
      state.users.items = [];
      state.users.status = Loading.Error;
    },

    [deleteUser.fulfilled.type]: (state: IAdminState, action) => {
      state.users.items = state.users.items.filter(
        (user) => user.id !== action.meta.arg
      );
    },
  },
});

export const adminReducer = adminSlice.reducer;
