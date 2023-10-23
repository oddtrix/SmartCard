import { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { ICardUpdate } from "../../types/global.typing";
import { useAppDispatch } from "../../redux/hooks";
import { fetchEditCard } from "../../redux/slices/cards";

const EditCard = (props: {
  editCard: string;
  setEdit: SetStateAction<boolean>;
  updateCardId: string;
  updateCardWord: string;
  updateCardTranslate: string;
}) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    props.setEdit(false);
  };

  const submitForm = async (data: ICardUpdate) => {
    const result = await dispatch(fetchEditCard(data));
    if (!result.payload) {
      return alert("Помилка");
    }
    handleClick();
  };
  const {
    register,
    handleSubmit,
    setError,
    // formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      id: props.updateCardId,
      word: props.updateCardWord,
      translation: props.updateCardTranslate,
    },
    mode: "onSubmit",
  });
  return (
    <div className="">
      <div className="border border-black inline-block rounded-md">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="m-4">
            <label className="mr-4">Слово</label>
            <input
              type="text"
              {...register("word", { required: "Вкажіть слово" })}
              className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 "
            />
          </div>
          <div className="m-4">
            <label className="mr-4">Переклад</label>
            <input
              type="text"
              {...register("translation", {
                required: "Вкажіть переклад слова",
              })}
              className=" border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 "
            />
          </div>

          <input
            type="submit"
            value="Оновити"
            className="focus:outline-none cursor-pointer text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          />

          <button
            type="button"
            onClick={handleClick}
            className="focus:outline-none text-white bg-gray-500 hover:bg-gray-400 focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
          >
            Відмінити
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCard;
