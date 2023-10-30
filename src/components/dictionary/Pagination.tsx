import { SetStateAction } from "react";
import { arrowLeft, arrowRight } from "../../constants/svg.constants";

const Pagination = (props: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}) => {
  return (
    <nav className="flex justify-center mt-5 mb-4">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <button
            disabled={props.currentPage === 1 ? true : false}
            onClick={() => props.setCurrentPage(props.currentPage - 1)}
            className={`${
              props.currentPage === 1 ? "bg-gray-300" : ""
            } flex cursor-pointer items-center justify-center disabled px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            <span className="sr-only">Previous</span>
            {arrowLeft}
          </button>
        </li>

        <li
          className={`my-class ${
            props.currentPage === 2 ? "enabled" : "disabled"
          }`}
        >
          <button
            disabled={props.currentPage === props.totalPages ? true : false}
            onClick={() => props.setCurrentPage(props.currentPage + 1)}
            className={`${
              props.currentPage === props.totalPages ? "bg-gray-300" : ""
            }
            flex cursor-pointer items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-300 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            <span className="sr-only">Next</span>
            {arrowRight}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
