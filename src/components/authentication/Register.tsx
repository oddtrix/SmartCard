import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { fetchRegister } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { UserSignInDTO } from "../../types/global.typing";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    setError,
    // formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitForm = async (data: UserSignInDTO) => {
    const result = await dispatch(fetchRegister(data));

    if (!result.payload) {
      return alert("Не вдалося зареєструватися");
    } else {
      console.log("REGISTER ");
      return navigate("/login");
    }
  };

  return (
    <div className="m-auto mt-16 max-w-xl p-4 border-2 border-slate-500 rounded-lg shadow sm:p-6 md:p-8 ">
      <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
        <h1 className="text-xl font-medium text-gray-900 ">
          Створити аккаунт
          <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-500 text-xl">
            SmartCard
          </span>
        </h1>
        <div className="flex justify-between">
          <div>
            <label
              htmlFor="text"
              className="block w-60 mb-2 text-sm font-medium text-gray-900 "
            >
              Ім'я
            </label>
            <input
              type="text"
              // name="name"
              className="text-black rounded w-full p-2.5"
              placeholder="Keanu"
              // required
              {...register("name", { required: "Вкажіть ім'я" })}
            />
          </div>
          <div>
            <label
              htmlFor="text"
              className="block w-60 mb-2 text-sm font-medium text-gray-900 "
            >
              Прізвище
            </label>
            <input
              type="text"
              //name="surname"
              id="surname"
              className="text-black rounded w-full p-2.5"
              placeholder="Reeves"
              //required
              {...register("surname", { required: "Вкажіть прізвище" })}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Ваш нік
          </label>
          <input
            type="text"
            //name="nickname"
            id="username"
            className="text-black rounded w-full p-2.5"
            placeholder="world_destroyer1337"
            //required
            {...register("username", { required: "Вкажіть нік" })}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Ваша пошта
          </label>
          <input
            type="email"
            //name="email"
            id="email"
            className="text-black rounded w-full p-2.5"
            placeholder="name@company.com"
            //required
            {...register("email", { required: "Вкажіть пошту" })}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Пароль
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              <label
                className="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img src="../../../public/img/hide.png" className="w-6" />
                ) : (
                  <img src="../../../public/img/show.png" className="w-6" />
                )}
              </label>
            </div>
            <input
              className="text-black rounded w-full p-2.5"
              id="password"
              type={showPassword ? "text" : "password"}
              // name="password"
              placeholder="••••••••"
              // required
              {...register("password", { required: "Вкажіть пароль" })}
            />
          </div>
        </div>
        <input
          type="submit"
          value="Зареєструватися"
          className="text-black font-medium rounded-lg text-base px-5 py-2.5 text-center border border-slate-500 hover:cursor-pointer hover:bg-slate-200"
        ></input>
        <div className="text-sm font-medium flex justify-center text-gray-500 ">
          <p className="mr-2">Вже є аккаунт?</p>
          <Link
            to="/login"
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
