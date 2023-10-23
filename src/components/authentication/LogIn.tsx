import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { Loading, fetchAuth, selectorIsAuth } from "../../redux/slices/auth";
import { UserLoginDTO } from "../../types/global.typing";
import { TailSpin } from "react-loader-spinner";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.auth.status);
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  console.log(userStatus);
  const {
    register,
    handleSubmit,
    setError,
    // formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitForm = async (data: UserLoginDTO) => {
    const result = await dispatch(fetchAuth(data));

    if (!result.payload) {
      return alert("Не вдалося авторизуватися");
    }
    if ("token" in result.payload) {
      window.localStorage.setItem("token", result.payload.token);
    }
  };

  const checkAuth = () => {
    if (selectorIsAuth()) {
      return <Navigate to="/dictionary" />;
    }
  };
  return (
    <div className="m-auto mt-28 max-w-sm p-4 border-2 border-slate-500 rounded-lg shadow sm:p-6 md:p-8">
      <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 ">
          Увійти в аккаунт
          <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-500 text-xl">
            SmartCard
          </span>
        </h5>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Пошта
          </label>
          <input
            type="email"
            // name="email"
            id="email"
            className="text-black rounded w-full p-2.5"
            placeholder="name@company.com"
            // required
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

        {/* <div className="flex items-start">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-50"
            >
              Запам'ятати мене
            </label>
          </div>
          <Link
            to="/lostpassword"
            className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
          >
            Забули пароль?
          </Link>
        </div> */}

        <input
          type="submit"
          value="Увійти"
          className="text-black font-medium rounded-lg text-base px-5 py-2.5 text-center border border-black hover:cursor-pointer hover:bg-black hover:text-white "
        ></input>

        {userStatus === Loading.Loading ? (
          <div className="flex justify-center mt-28">
            <TailSpin
              height="60"
              width="60"
              color="#51E5FF"
              ariaLabel="tail-spin-loading"
              radius="1"
              visible={true}
            />
          </div>
        ) : (
          ""
        )}
        {userStatus === Loading.Loaded ? <Navigate to="/dictionary" /> : ""}

        <div className="text-sm font-medium flex content-center justify-center items-center text-gray-500 ">
          <p className="mr-2">Ще не зареєстровані? </p>
          <Link
            to="/register"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Створити аккаунт
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
