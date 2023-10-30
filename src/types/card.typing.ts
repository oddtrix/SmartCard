import { IUserId } from "./user.typing";

export interface ICardId extends IUserId {}

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

export interface ICardDTO {
  word: string;
  translation: string;
}

export interface IAnswerCard {
  id: string;
  questionWord_id: string;
  questionWord_lr: number;
  learningRate: number;
  answerWord: string;
  originalWord: string;
  isCorrect: boolean;
}

export interface IQuizCard {
  questionWord: string;
  answerOptions: IAnswerCard[];
}

export interface IAnswerCardInp {
  questionWord: string;
  answer: string | null;
  questionWord_id: string;
  questionWord_lr: number;
}

export interface IQuizCardInp {
  questionWord: string;
  answerOptions: IAnswerCardInp[];
}
