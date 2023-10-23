import {Link} from "react-router-dom";

const Exercises = () => {
    return (
        <div>
            <div className='flex justify-between w-5/6 max-lg:flex-col max-lg:w-1/2  m-auto mt-16'>
                <Link to="first-step" id='first-step'
                      className="block max-w-sm max-xs:w-1/5 p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-700  ">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Перший крок
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Перекласти слова на англійську</p>
                </Link>
                <Link to="second-step"
                      className="max-lg:mt-5 block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-700  ">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Другий крок
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Перекласти слова з англійської</p>
                </Link>
                <Link to="third-step"
                      className="max-lg:mt-5 block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-700 ">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Третій крок
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Правильно написати слово</p>
                </Link>
                <Link to="fourth-step"
                      className="max-lg:mt-5 block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-700  ">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Четвертий крок
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Правильно написати переклад</p>
                </Link>
            </div>
        </div>
    );
};

export default Exercises;