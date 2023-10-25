import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../helpers/http.module";
import {
  CardDTO,
  ICard,
  ICardUpdate,
  IUserId,
} from "../../types/global.typing";
import { Loading } from "./auth";

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async ({ userId, currentPage }: { userId: IUserId; currentPage: number }) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.get(
      `/Domain/Get/${userId.id}?CurrentPage=${currentPage}`,
      { headers }
    );
    return data;
  }
);

export const fetchCreateCard = createAsyncThunk(
  "cards/fetchCreateCard",
  async (card: CardDTO) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.post(
      `/Domain/Create`,
      { word: card.word, translation: card.translation },
      { headers }
    );
    return data;
  }
);

export const fetchDeleteCard = createAsyncThunk(
  "cards/fetchDeleteCard",
  async (cardId: string) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = {
      id: cardId,
    };
    await axios.delete(`/Domain/Delete`, { headers, data });
  }
);

export const fetchEditCard = createAsyncThunk(
  "cards/fetchEditCard",
  async (card: ICardUpdate) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.put(
      `/Domain/Update`,
      { id: card.id, word: card.word, translation: card.translation },
      { headers }
    );
    return data;
  }
);

export const encLearningRate = createAsyncThunk(
  "cards/encLearningRate",
  async (ansop) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.put(
      `/Domain/IncreaseLearningRate`,
      { id: ansop.questionWord_id },
      { headers }
    );
    return data;
  }
);
export const decLearningRate = createAsyncThunk(
  "cards/decLearningRate",
  async (ansop) => {
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await axios.put(
      `/Domain/DecreaseLearningRate`,
      { id: ansop.questionWord_id },
      { headers }
    );
    return data;
  }
);

type CardsState = {
  cards: {
    items: ICard[];
    status: Loading;
  };
};

const initialState: CardsState = {
  cards: {
    items: [],
    status: Loading.Loading,
  },
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCards.pending.type]: (state: CardsState) => {
      state.cards.items = [];
      state.cards.status = Loading.Loading;
    },
    [fetchCards.fulfilled.type]: (
      state: CardsState,
      action: PayloadAction<ICard[], string>
    ) => {
      state.cards.items = action.payload;
      state.cards.status = Loading.Loaded;
    },
    [fetchCards.rejected.type]: (state: CardsState) => {
      state.cards.items = [];
      state.cards.status = Loading.Error;
    },

    [fetchCreateCard.fulfilled.type]: (
      state: CardsState,
      action: PayloadAction<ICard>
    ) => {
      state.cards.items.push(action.payload);
    },

    [fetchDeleteCard.fulfilled.type]: (state: CardsState, action) => {
      state.cards.items = state.cards.items.filter(
        (card) => card.id !== action.meta.arg
      );
    },

    // [fetchDeleteCard.rejected.type]: (state: CardsState) => {
    //   state.cards.items = state.cards.items
    //   state.cards.status = "Error";
    // },

    [decLearningRate.fulfilled.type]: (
      state: CardsState,
      action: PayloadAction<ICard>
    ) => {
      state.cards.items = state.cards.items.map((card) => {
        if (card.id === action.payload.id) {
          return {
            ...card,
            learningRate: action.payload.learningRate,
          };
        } else {
          return card;
        }
      });
      state.cards.status = Loading.Loaded;
    },

    [encLearningRate.fulfilled.type]: (
      state: CardsState,
      action: PayloadAction<ICard>
    ) => {
      state.cards.items = state.cards.items.map((card) => {
        if (card.id === action.payload.id) {
          return {
            ...card,
            learningRate: action.payload.learningRate,
          };
        } else {
          return card;
        }
      });
      state.cards.status = Loading.Loaded;
    },

    [fetchEditCard.pending.type]: (state: CardsState) => {
      state.cards.status = Loading.Loading;
    },
    [fetchEditCard.fulfilled.type]: (
      state: CardsState,
      action: PayloadAction<ICard>
    ) => {
      state.cards.items = state.cards.items.map((card) => {
        if (card.id === action.payload.id) {
          return {
            ...card,
            word: action.payload.word,
            translation: action.payload.translation,
          };
        } else {
          return card;
        }
      });
      state.cards.status = Loading.Loaded;
    },
    [fetchEditCard.rejected.type]: (state: CardsState) => {
      state.cards.items = [];
      state.cards.status = Loading.Error;
    },
  },
});

export const cardsReducer = cardsSlice.reducer;
