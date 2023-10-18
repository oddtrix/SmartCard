import React, { useState } from "react";
import close from "../../img/close.png";
import axios from "../../axios";

const AddCard = ({ addword , setAddWord } : any) => {
    const handleClick = () =>{
        setAddWord(false)
    }

    const onSubmit = async (event) =>{
        event.preventDefault();
        try {
            const fields = {word, translation}
            const {data} = await axios.post('/cards', fields)
            handleClick()
            updateInfo()
        } catch (err){
            console.warn(err)
        }
    }
  return (
    <div className="m-auto mt-28 max-w-sm p-4 bg-white select-none relative border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-navbar dark:border-white">
      <button onClick={handleClick}>
        <img
          className="w-8 cursor-pointer absolute top-2 right-3"
          src={close}
          alt="Close"
        />
      </button>
      <form>
        <div>
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Слово або словосполучення
          </label>
          <input
            type="text"
            name="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div className="mt-3">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Переклад
          </label>
          <input
            type="text"
            name="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div className="flex mt-5 justify-center">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Зберегти
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCard;
