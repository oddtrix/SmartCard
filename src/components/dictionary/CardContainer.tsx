import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import AddCard from "../AddCard";
import { ICard } from "../../types/global.typing";
import CardItem from "./CardItem";

const CardContainer = (props: { myCards: ICard[] }) => {
  const [addWord, setAddWord] = useState(false);
  const [edit, setEdit] = useState(false);
  const [cards, setCards] = useState<ICard[]>([]);
  const [card, setCard] = useState({ word: "", translation: "" });
  const [updateCard, setUpdateCard] = useState({
    id: "",
    word: "",
    translation: "",
  });

  const addNewWord = () => {
    setAddWord(!addWord);
  };

  const save = () => {
    httpModule.post("Domain/Create", card);
    location.reload();
  };

  const deleteCard = (id: string) => {
    if (id) {
      console.log(id);
      httpModule.delete(`Card/Delete`, { data: { id: id } });
    }
    location.reload();
  };

  const editt = (id: string) => {
    if (id && updateCard.word !== null && updateCard.translation !== null) {
      updateCard.id = id;
    }
  };

  const editPut = () => {
    httpModule.put(`Card/Update`, updateCard);
    location.reload();
  };

  return (
    <>
      {/* {addWord ? <AddCard addword={addWord} setAddWord={setAddWord} /> : false} */}
      {addWord ? (
        <div className="border border-black inline-block rounded-md">
          <input type="hidden" />
          <div className="m-4">
            <label className="mr-4">Word</label>
            <input
              type="text"
              onChange={(e) => setCard({ ...card, word: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 "
            />
          </div>
          <div className="m-4">
            <label className="mr-4">Translation</label>
            <input
              type="text"
              onChange={(e) =>
                setCard({ ...card, translation: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 "
            />
          </div>
          <button
            onClick={save}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add
          </button>

          <button
            type="button"
            onClick={addNewWord}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Cancel
          </button>
        </div>
      ) : (
        ""
      )}
      {edit ? (
        <div className="border border-black inline-block rounded-md">
          <div className="m-4">
            <label className="mr-4">Word</label>
            <input
              type="text"
              onChange={(e) =>
                setUpdateCard({ ...updateCard, word: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 "
            />
          </div>
          <div className="m-4">
            <label className="mr-4">Translation</label>
            <input
              type="text"
              onChange={(e) =>
                setUpdateCard({ ...updateCard, translation: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 "
            />
          </div>
          <button
            onClick={editPut}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => setEdit(false)}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Cancel
          </button>
        </div>
      ) : (
        ""
      )}
      <div className="w-3/5 max-sm:w-full max-md:w-5/6 max-lg:w-full max-xl:w-full m-auto relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left text-gray-500 table-auto">
          <caption className="p-2 text-lg font-semibold text-left text-gray-900">
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg "
              onClick={addNewWord}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-white border-2 border-cyan-500 rounded-md group-hover:bg-opacity-0">
                Додати слово
              </span>
            </button>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-slate-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Слово
              </th>
              <th scope="col" className="px-6 py-3">
                Переклад
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Прослухати
              </th> */}
              <th scope="col" className="px-6 py-3">
                Прогрес
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Дії</span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Видалити</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.myCards.map((card: ICard) => (
              <CardItem card={card} key={card.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CardContainer;
