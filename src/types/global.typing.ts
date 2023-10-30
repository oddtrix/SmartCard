import { IAdminUser } from "./admin.typing";
import { ICard } from "./card.typing";
import { IUser, IUserLoginDTO } from "./user.typing";

export interface FormData extends IUserLoginDTO {}

export interface DecodedToken {
  [key: string]: string;
}

export enum Loading {
  "Idle",
  "Loading",
  "Loaded",
  "Error",
  "Success",
}

export interface IUserState {
  data: IUser | null;
  status: Loading;
}

export interface ICardsState {
  cards: {
    items: ICard[];
    status: Loading;
  };
}

export interface IAdminState {
  users: {
    items: IAdminUser[];
    status: Loading;
  };
}
