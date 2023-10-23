import { Link, Navigate } from "react-router-dom";
import { DecodedToken, ICardId } from "../../types/global.typing";
import { getUserId } from "../../helpers/additionFunction";

const Exercises = () => {
  const userId: ICardId = getUserId();

  return (
    <div>
      {userId.id !== null ? true : <Navigate to="/signin" />}
      <div className="flex justify-between w-11/12 max-lg:flex-col max-lg:w-1/2  m-auto mt-16">
        <Link
          to="first-step"
          id="first-step"
          className="block max-w-sm max-xs:w-1/5 p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-300  "
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            Перший крок
          </h5>
          <p className="font-normal text-gray-700 ">
            Перекласти слова на англійську
          </p>
        </Link>
        <Link
          to="second-step"
          className="max-lg:mt-5 block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-300  "
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            Другий крок
          </h5>
          <p className="font-normal text-gray-700 ">
            Перекласти слова з англійської
          </p>
        </Link>
        <Link
          to="third-step"
          className="max-lg:mt-5 block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-300 "
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            Третій крок
          </h5>
          <p className="font-normal text-gray-700 ">
            Правильно написати слово
          </p>
        </Link>
        <Link
          to="fourth-step"
          className="max-lg:mt-5 block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-300  "
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            Четвертий крок
          </h5>
          <p className="font-normal text-gray-700 ">
            Правильно написати переклад
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Exercises;
function jwt_decode(token: string): DecodedToken | null {
  throw new Error("Function not implemented.");
}
