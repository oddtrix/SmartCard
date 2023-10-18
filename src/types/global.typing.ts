export interface ICard {
  id: string;
  word: string;
  translation: string;
  learningRate: number;
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

export interface DecodedToken {
  [key: string]: string;
}
