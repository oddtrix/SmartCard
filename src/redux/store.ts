import { configureStore } from "@reduxjs/toolkit";
import { cardsReducer } from "./slices/cards";
import { authReducer } from "./slices/auth";
import { adminReducer } from "./slices/admin";

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
