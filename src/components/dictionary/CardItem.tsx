import React from "react";
// import "react-circular-progressbar/dist/styles.css";
import { useForm } from "react-hook-form";

import { ICard, ICardId } from "../../types/global.typing";
import { useAppDispatch } from "../../redux/hooks";
import { fetchDeleteCard } from "../../redux/slices/cards";

const CardItem = (props: { card: ICard }) => {
  const dispatch = useAppDispatch();

  const deleteCard = async (cardId: string) => {
    if (window.confirm("Ви дійсно хочете видалити слово?")) {
      console.log(cardId);
      await dispatch(fetchDeleteCard(cardId));
    }
  };

  const handleDelete = () => deleteCard(props.card.id)
  const {
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
  });
  return (
    <>
      <tr className="bg-white border-b dark:bg-navbar dark:border-gray-700 text-black">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-lg text-gray-900 whitespace-nowrap"
        >
          {props.card.word}
        </th>
        <td className="px-6 py-4 text-lg">{props.card.translation}</td>

        <td className="px-6 py-4 text-lg">{props.card.learningRate} %</td>
        <td>
          <form onSubmit={handleSubmit(handleDelete)}>
            <button
              type="submit"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Видалити
              </button>

          </form>
        </td>
        {/* <td>
          <button
            onClick={() => {
              setEdit(true);
              editCard(props.card.id);
            }}
            className="focus:outline-none text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Edit
          </button>
        </td> */}
      </tr>
    </>
  );
};

export default CardItem;
