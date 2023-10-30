import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks";
import { fetchDeleteCard } from "../../redux/slices/cards";
import volume from "../../../public/img/volume.svg";
import { listenTo } from "../../helpers/additionFunction";
import { ICard } from "../../types/card.typing";

const CardItem = (props: {
  card: ICard;
  admin: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateCard?: React.Dispatch<React.SetStateAction<string>>;
  setUpdateCardWord?: React.Dispatch<React.SetStateAction<string>>;
  setUpdateCardTranslate?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useAppDispatch();

  const deleteCard = async (cardId: string) => {
    await dispatch(fetchDeleteCard(cardId));
  };

  const handleDelete = () => deleteCard(props.card.id);
  const handleEdit = () => {
    if (
      props.setEdit &&
      props.setUpdateCard &&
      props.setUpdateCardWord &&
      props.setUpdateCardTranslate
    ) {
      props.setUpdateCard(props.card.id);
      props.setUpdateCardWord(props.card.word);
      props.setUpdateCardTranslate(props.card.translation);

      props.setEdit(true);
    }
  };

  const { handleSubmit } = useForm({
    mode: "onTouched",
  });

  return (
    <>
      <tr className="bg-white border-b dark:bg-navbar dark:border-gray-700 text-black">
        <td
          scope="row"
          className="text-center px-6 py-4 font-medium text-lg text-gray-900 break-all w-3/12 "
        >
          {props.card.word}
        </td>
        <td className="text-center px-6 py-4 text-lg break-all w-3/12">
          {props.card.translation}
        </td>
        {props.admin ? null : (
          <td className="text-center px-6 py-4 ">
            <button className="" onClick={() => listenTo(props.card.word)}>
              <img className="w-8" src={volume} alt="Listen" />
            </button>
          </td>
        )}
        <td className="text-center px-6 py-4 text-lg">
          {props.card.learningRate} %
        </td>
        {props.admin ? null : (
          <>
            <td>
              <form
                onSubmit={handleSubmit(handleDelete)}
                className="flex justify-center"
              >
                <button
                  type="submit"
                  className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                >
                  Видалити
                </button>
              </form>
            </td>
            <td>
              <div className="flex justify-center">
                <button
                  onClick={handleEdit}
                  type="button"
                  className="text-center focus:outline-none text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Змінити
                </button>
              </div>
            </td>
          </>
        )}
      </tr>
    </>
  );
};

export default CardItem;
