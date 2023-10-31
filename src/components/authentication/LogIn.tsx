import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IUserLoginDTO } from "../../types/user.typing";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginUser } from "../../redux/slices/auth";
import { Loading } from "../../types/global.typing";
import { Link, Navigate } from "react-router-dom";
import hide from "../../../public/img/hide.png";
import show from "../../../public/img/show.png";
import { TailSpin } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import React from "react";
import * as Yup from "yup";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector((state) => state.auth.status);
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("Вкажіть пошту")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Введіть коректну адресу електронної пошти"
      ),
    password: Yup.string()
      .required("Вкажіть пароль")
      .min(6, "Пароль повинен містити не менше 6 символів")
      .matches(
        /^(?=.*[!@#№$;%:?])(?=.*[0-9])(?=.*[A-Z])/,
        "Пароль повинен містити принаймні один спеціальний символ (!@#№$;%:?), одну цифру і хоча б одну літеру у великому регістрі"
      ),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  const submitForm = async (data: IUserLoginDTO) => {
    const result = await dispatch(LoginUser(data));
    if (result.meta.requestStatus === "rejected") {
      setError("root.serverError", { type: "404" });
    }
    if (result.payload) {
      if ("token" in result.payload) {
        window.localStorage.setItem("token", result.payload.token);
      }
    }
  };
  setTimeout(() => {
    const successDiv = document.getElementById("success");
    successDiv?.classList.add("hidden");
  }, 5000);
  return (
    <>
      {userStatus === Loading.Success ? (
        <div
          id="success"
          className="w-[310px] m-auto bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Ви успішно створити аккаунт</p>
              <p className="text-sm">Тепер увійдіть до нього</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="m-auto mt-28 max-w-sm p-4 border-2 border-slate-500 rounded-lg shadow sm:p-6 md:p-8">
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 ">
            Увійти в аккаунт
            <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-500 text-xl">
              SmartCard
            </span>
          </h5>

          {errors?.root?.serverError.type === "404" && (
            <p className="text-left text-red-500 text-sm">
              Невірна адреса електронної пошти або пароль
            </p>
          )}
          <div>
            <label
              htmlFor="email"
              className="block w-12 mb-2 text-sm font-medium text-gray-900 "
            >
              Пошта
            </label>

            <p className="text-left text-red-500 text-sm">
              {errors.email?.message}
            </p>

            <input
              type="email"
              // name="email"
              id="email"
              className="text-black rounded w-full p-2.5 border border-black "
              placeholder="name@company.com"
              // required
              {...register("email")}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block w-12 mb-2 text-sm font-medium text-gray-900 "
            >
              Пароль
            </label>
            <p className="text-left text-red-500 text-sm">
              {errors.password?.message}
            </p>
            <div className="relative w-full">
              <div className="absolute inset-y-0 right-0 flex items-center px-2">
                <label
                  className="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <img src={hide} className="w-6" />
                  ) : (
                    <img src={show} className="w-6" />
                  )}
                </label>
              </div>
              <input
                className="text-black rounded w-full p-2.5 border border-black"
                id="password"
                type={showPassword ? "text" : "password"}
                // name="password"
                placeholder="••••••••"
                // required
                {...register("password")}
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
    </>
  );
};

export default SignIn;
