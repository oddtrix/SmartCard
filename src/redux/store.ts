import { configureStore } from "@reduxjs/toolkit";
import { cardsReducer } from "./slices/cards";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
