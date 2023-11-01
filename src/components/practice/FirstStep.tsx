import React, { useState } from "react";
import {} from "react-redux";
import {
  decLearningRate,
  encLearningRate,
  fetchCards,
} from "../../redux/slices/cards";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { v4 } from "uuid";
import { getUserId, shuffle } from "../../helpers/additionFunction";
import { IUserId } from "../../types/user.typing";
import { IAnswerCard, IQuizCard } from "../../types/card.typing";

const FirstStep = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.cards.items);

  const userId: IUserId = getUserId();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [end, setEnd] = useState(false);
  const [learnedWords, setLearnedWords] = useState<[string, React.ReactNode][]>(
    []
  );
  const quiz: IQuizCard[] = [...cards]
    .sort((a, b) => a.learningRate - b.learningRate)
    .slice(0, 5)
    .map((card) => {
      return {
        questionWord: card.translation,
        answerOptions: shuffle(
          [...cards]
            .sort((a, b) => a.learningRate - b.learningRate)
            .slice(0, 5)
            .map((el) => {
              return {
                id: el.id,
                questionWord_id: card.id,
                questionWord_lr: card.learningRate,
                learningRate: el.learningRate,
                answerWord: el.word,
                originalWord: card.translation,
                isCorrect: card.id === el.id ? true : false,
              };
            })
        ),
      };
    });
  const handleAnswerOptionClick = (ansop: IAnswerCard) => {
    if (ansop.isCorrect) {
      dispatch(encLearningRate(ansop));
      setLearnedWords([
        ...learnedWords,
        [ansop.originalWord, <span className="text-green-400">+1%</span>],
      ]);
    } else {
      dispatch(decLearningRate(ansop));
      setLearnedWords([
        ...learnedWords,
        [
          ansop.originalWord,
          ansop.learningRate === 0 ? (
            "0%"
          ) : (
            <span className="text-red-400">-1%</span>
          ),
        ],
      ]);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quiz.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setEnd(true);
    }
  };

  React.useEffect(() => {
    dispatch(fetchCards({ userId }));
  }, []);
  return (
    <div className="flex mt-20 justify-between ">
      {quiz.length > 0 ? (
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow w-2/4 max-md:w-full m-auto dark:bg-navbar">
          {end ? (
            <div className="w-3/5">
              <h5 className="mb-2 text-2xl tracking-tight text-gray-900 ">
                Ваш результат:
              </h5>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <ul>
                    {learnedWords.map((el) => (
                      <li key={v4()} className="text-xl ">
                        {el[0]}
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
              <div className="flex justify-between flex-row-reverse ">
                <h5 className="mb-2 text-3xl max-md:text-xl text-right  tracking-tight text-gray-900 ">
                  {currentQuestion + 1} / {quiz.length}
                </h5>
                <h5 className="mb-2 text-2xl max-md:text-xl tracking-tight text-gray-900 ">
                  Обери правильний переклад:
                </h5>
              </div>
              <hr className="w-full h-px my-5 bg-gray-200 border-0 dark:bg-white-700 "></hr>
              <div className="flex justify-between max-lg:flex-col">
                <div className="flex flex-col items-center ">
                  <h3 className="mt-9 max-lg:mt-0 text-xl  max-lg:mb-4 break-all">
                    Як перекласти слово{" "}
                    <span className="font-bold">
                      {quiz[currentQuestion].questionWord}
                    </span>
                    ?
                  </h3>
                </div>
                <div className="flex flex-col">
                  {quiz.length > 0
                    ? quiz[currentQuestion].answerOptions.map((ansop) => (
                        <button
                          key={v4()}
                          type="button"
                          id={ansop.id}
                          onClick={() => handleAnswerOptionClick(ansop)}
                          className="py-2.5 px-5 mr-2 mb-2 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-white-800 dark:text-black-400 dark:border-gray-600 dark:hover:text-blue-700 dark:hover:bg-black-200"
                        >
                          {ansop.answerWord}
                        </button>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FirstStep;
