import {
  idClaim,
  roleClaim,
  userNameClaim,
} from "../constants/string.constants";
import { DecodedToken } from "../types/global.typing";
import jwt_decode from "jwt-decode";
import { IRole, IUserId, IUserName } from "../types/user.typing";
import { IAnswerCard } from "../types/card.typing";

export const shuffle = (array: IAnswerCard[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const listenTo = (word: string) => {
  const speech = new SpeechSynthesisUtterance(word);
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
};

export const getUserId = () => {
  const token = window.localStorage.getItem("token");
  const decoded: DecodedToken | null = token ? jwt_decode(token) : null;
  const userId: IUserId = decoded
    ? { id: decoded[idClaim] }
    : { id: undefined };
  return userId;
};

export const getAdmin = () => {
  const token = window.localStorage.getItem("token");
  const decoded: DecodedToken | null = token ? jwt_decode(token) : null;
  const admin: IRole = decoded
    ? { role: decoded[roleClaim] }
    : { role: undefined };
  return admin;
};

export const getUserName = () => {
  const token = window.localStorage.getItem("token");
  const decoded: DecodedToken | null = token ? jwt_decode(token) : null;
  const username: IUserName = decoded
    ? { username: decoded[userNameClaim] }
    : { username: undefined };
  return username;
};
