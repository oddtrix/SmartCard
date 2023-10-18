import React from "react";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };
  return (
    <div className="m-auto mt-16 max-w-xl p-4 border-2 border-cyan-500 rounded-lg shadow sm:p-6 md:p-8 ">
      <form className="space-y-6" onSubmit={onSubmit}>
        <h1 className="text-xl font-medium text-gray-900 dark:text-white">
          Створити аккаунт
        </h1>
        <div className="flex justify-between">
          <div>
            <label
              htmlFor="text"
              className="block w-60 mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ім'я
            </label>
            <input
              type="text"
              name="name"
              className="text-black rounded w-full p-2.5"
              placeholder="Keanu"
              required
            />
          </div>
          <div>
            <label
              htmlFor="text"
              className="block w-60 mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Прізвище
            </label>
            <input
              type="text"
              name="surname"
              id="surname"
              className="text-black rounded w-full p-2.5"
              placeholder="Reeves"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ваш нік
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            className="text-black rounded w-full p-2.5"
            placeholder="world_destroyer1337"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ваша пошта
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="text-black rounded w-full p-2.5"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="text-black rounded w-full p-2.5"
            required
          />
        </div>
        <input
          type="submit"
          value="Зареєструватися"
          className="text-white font-medium rounded-lg text-base px-5 py-2.5 text-center border border-cyan-500 hover:cursor-pointer"
        ></input>
        <div className="text-sm font-medium flex justify-center text-gray-500 dark:text-gray-50">
          <p className="mr-2">Вже є аккаунт?</p>
          <Link
            to="/signin"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Авторизуйтесь тут.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
