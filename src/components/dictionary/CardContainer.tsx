import { useState } from "react";
import AddCard from "../card/AddCard";
import EditCard from "../card/EditCard";
import { ICard } from "../../types/global.typing";
import CardItem from "./CardItem";

const CardContainer = (props: { myCards: ICard[] }) => {
  const [addWord, setAddWord] = useState(false);
  const [editCard, setEdit] = useState(false);

  const [updateCardId, setUpdateCard] = useState("");
  const [updateCardWord, setUpdateCardWord] = useState("");
  const [updateCardTranslate, setUpdateCardTranslate] = useState("");

  const addNewWord = () => {
    setAddWord(!addWord);
  };

  return (
    <>
      {addWord ? <AddCard addword={addWord} setAddWord={setAddWord} /> : false}

      {editCard ? (
        <EditCard
          editCard={editCard}
          setEdit={setEdit}
          updateCardId={updateCardId}
          updateCardWord={updateCardWord}
          updateCardTranslate={updateCardTranslate}
        />
      ) : (
        false
      )}

      <div className="w-5/6 max-sm:w-full max-md:w-5/6 max-lg:w-full max-xl:w-full m-auto relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left text-gray-500 table-auto">
          <caption className="p-2 text-lg font-semibold text-left text-gray-900">
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg "
              onClick={addNewWord}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-blakc border border-slate-500 rounded-md group-hover:bg-opacity-0 hover:text-white hover:bg-black ">
                Додати слово
              </span>
            </button>
          </caption>
          <thead className="text-xs text-white uppercase bg-black">
            <tr>
              <th scope="col" className="text-center px-6 py-3">
                Слово
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Переклад
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Прослухати
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Прогрес
              </th>
              <th scope="col" className=" px-6 py-3">
                Дії
              </th>
              <th scope="col" className="text-center px-6 py-3">
                <span className="sr-only">Видалити</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.myCards.map((card: ICard) => (
              <CardItem
                card={card}
                key={card.id}
                setEdit={setEdit}
                setUpdateCard={setUpdateCard}
                setUpdateCardWord={setUpdateCardWord}
                setUpdateCardTranslate={setUpdateCardTranslate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CardContainer;
