import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../helpers/http.module";
import { ICard, ICardId, IUserId } from "../../types/global.typing";

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (userId: IUserId) => {
    const { data } = await axios.get(`/Domain/Get/${userId.id}`);
    return data;
  }
);

export const fetchDeleteCard = createAsyncThunk(
  "cards/fetchDeleteCard",
  async (cardId: ICardId) => {
    await axios.delete(`/Domain/Delete/guid/1231231`, { data: { id: cardId } });
  }
);

export const fetchEditCards = createAsyncThunk(
  "cards/fetchEditCards",
  async (id) => {
    const { data } = await axios.put(`/cards/${id}`);
    return data;
  }
);

type CardsState = {
  cards: {
    items: ICard[];
    status: string;
  };
};

const initialState: CardsState = {
  cards: {
    items: [],
    status: "Loading",
  },
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCards.pending.type]: (state: CardsState) => {
      state.cards.items = [];
      state.cards.status = "Loading";
    },
    [fetchCards.fulfilled.type]: (
      state: CardsState,
      action: PayloadAction<ICard[], string>
    ) => {
      state.cards.items = action.payload;
      state.cards.status = "Loaded";
    },
    [fetchCards.rejected.type]: (state: CardsState) => {
      state.cards.items = [];
      state.cards.status = "Error";
    },

    [fetchDeleteCard.pending.type]: (
      state: CardsState,
      action: PayloadAction<ICard>
    ) => {
      state.cards.items = state.cards.items.filter(
        (card: ICard) => card.id !== action.payload.id
      );
    },

    [fetchEditCards.pending.type]: (state: CardsState) => {
      state.cards.items = [];
      state.cards.status = "Loading";
    },
    [fetchEditCards.fulfilled.type]: (
      state: CardsState,
      action: PayloadAction<ICard[], string>
    ) => {
      state.cards.items = action.payload;
      state.cards.status = "Loaded";
    },
    [fetchEditCards.rejected.type]: (state: CardsState) => {
      state.cards.items = [];
      state.cards.status = "Error";
    },
  },
});

export const cardsReducer = cardsSlice.reducer;
