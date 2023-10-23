export interface ICard {
  id: string;
  word: string;
  translation: string;
  learningRate: number;
}

export interface ICardUpdate {
  id: string;
  word: string;
  translation: string;
}

export interface IUserId {
  id: string | null;
}

export interface ICardId extends IUserId {}

export interface FormData {
  email: string;
  password: string;
}

export type UserLoginDTO = {
  email: string;
  password: string;
};

export type UserSignInDTO = {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
};

export type CardDTO = {
  word: string;
  translation: string;
}

export interface DecodedToken {
  [key: string]: string;
}
