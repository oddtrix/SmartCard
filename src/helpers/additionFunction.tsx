import { idClaim } from "../constants/string.constants";
import { DecodedToken, ICardId } from "../types/global.typing";
import jwt_decode from "jwt-decode";

export const shuffle = (array) => {
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
  const userId: ICardId = decoded ? { id: decoded[idClaim] } : { id: null };
  return userId;
};
