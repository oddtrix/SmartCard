import React, { useState } from "react";
import {
  decLearningRate,
  encLearningRate,
  fetchCards,
} from "../../redux/slices/cards";
import { v4 } from "uuid";
import volume from "../../../public/img/volume.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUserId, listenTo } from "../../helpers/additionFunction";
import { IUserId } from "../../types/user.typing";
import { IAnswerCardInp, IQuizCardInp } from "../../types/card.typing";

const ThirdStep = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.cards.items);

  const userId: IUserId = getUserId();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [end, setEnd] = useState(false);
  const [learnedWords, setLearnedWords] = useState<
    [IAnswerCardInp, React.ReactNode, boolean][]
  >([]);
  const quiz: IQuizCardInp[] = [...cards]
    .sort((a, b) => a.learningRate - b.learningRate)
    .slice(0, 5)
    .map((card) => {
      return {
        questionWord: card.word,
        answerOptions: [
          {
            questionWord: card.word,
            answer: null,
            questionWord_id: card.id,
            questionWord_lr: card.learningRate,
          },
        ],
      };
    });

  const handleAnswerOptionClick = (ansop: IAnswerCardInp) => {
    let inputElement = document.getElementById(
      "inp_answ"
    ) as HTMLInputElement | null;
    if (inputElement) {
      let answer = inputElement.value;

      if (ansop.questionWord === answer) {
        setLearnedWords([
          ...learnedWords,
          [ansop, <span className="text-green-400">+1%</span>, true],
        ]);
        if (answer !== "") {
          const inputElement = document.getElementById(
            "inp_answ"
          ) as HTMLInputElement | null;

          if (inputElement) {
            inputElement.value = "";
          }
        }
      } else {
        setLearnedWords([
          ...learnedWords,
          [
            ansop,
            ansop.questionWord_lr === 0 ? (
              "0%"
            ) : (
              <span className="text-red-400">-1%</span>
            ),
            false,
          ],
        ]);
        const inputElement = document.getElementById(
          "inp_answ"
        ) as HTMLInputElement | null;

        if (inputElement) {
          inputElement.value = "";
        }
      }
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quiz.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setEnd(true);
      }
    }
  };
  const updateState = (
    learnedWords: [IAnswerCardInp, React.ReactNode, boolean][]
  ) => {
    learnedWords.forEach((word) => {
      if (word[2] === true) {
        dispatch(encLearningRate(word[0]));
      } else {
        dispatch(decLearningRate(word[0]));
      }
    });
  };
  React.useEffect(() => {
    updateState(learnedWords);
  }, [end]);
  React.useEffect(() => {
    dispatch(fetchCards({ userId }));
  }, []);
  return (
    <div className="flex mt-20 justify-between">
      {quiz.length > 0 ? (
        <div className="block p-6 border bg-white border-gray-200 rounded-lg shadow w-2/4 max-md:w-full m-auto dark:bg-navbar">
          {end ? (
            <div className="w-3/5">
              <h5 className="mb-2 text-2xl tracking-tight text-gray-900 ">
                Ваш результат:
              </h5>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <ul>
                    {learnedWords.map((el) => (
                      <li key={v4()} className="text-xl">
                        {el[0].questionWord}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col">
                  <ul>
                    {learnedWords.map((el) => (
                      <li key={v4()} className="text-xl">
                        {el[1]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {end ? (
            ""
          ) : (
            <div className="dark:bg-navbar">
              <div className="flex justify-between flex-row-reverse">
                <h5 className="mb-2 text-3xl max-md:text-xl text-right  tracking-tight text-gray-900 ">
                  {currentQuestion + 1} / {quiz.length}
                </h5>
                <h5 className="mb-2 text-2xl max-md:text-xl tracking-tight text-gray-900 ">
                  Правильно написати слово:
                </h5>
              </div>
              <hr className="w-full h-px my-5 bg-gray-200 border-0 dark:bg-white"></hr>
              {quiz.length > 0
                ? quiz[currentQuestion].answerOptions.map((ansop) => (
                    <div className="flex flex-col items-center" key={v4()}>
                      <div className="">
                        <h3 className="mt-9 mb-5 text-xl flex items-center ">
                          Прослухати слово
                          <button
                            className="ml-2"
                            onClick={() => listenTo(ansop.questionWord)}
                          >
                            <img className="w-8 " src={volume} alt="Listen" />
                          </button>
                          :
                        </h3>
                      </div>
                      <div className="">
                        <input
                          className="border text-xl text-center max-sm:text-xl"
                          type="text"
                          name=""
                          id="inp_answ"
                        />
                      </div>
                      <button
                        type="button"
                        id={ansop.questionWord_id}
                        onClick={() => handleAnswerOptionClick(ansop)}
                        className="py-2.5 px-5 mr-2 mb-2 mt-5 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-white dark:text-black dark:border-gray-600 dark:hover:text-blue-700"
                      >
                        Далі
                      </button>
                    </div>
                  ))
                : ""}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ThirdStep;
