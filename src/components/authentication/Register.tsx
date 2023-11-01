import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RegisterUser } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { IUserSignInDTO } from "../../types/user.typing";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loading } from "../../types/global.typing";
import { TailSpin } from "react-loader-spinner";
import hide from "../../../public/img/hide.png";
import show from "../../../public/img/show.png";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userStatus = useAppSelector((state) => state.auth.status);

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Вкажіть ім'я"),
    surname: Yup.string().required("Вкажіть прізвище"),
    username: Yup.string().required("Вкажіть нікнейм").min(3).max(12),

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
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const submitForm = async (data: IUserSignInDTO) => {
    const result = await dispatch(RegisterUser(data));

    if (result.meta.requestStatus === "rejected") {
      setError("root.serverError", { type: "403" });
    } else {
      return navigate("/login");
    }
  };

  return (
    <div className="m-auto mt-6 max-w-xl p-4 border-2 border-slate-500 rounded-lg shadow sm:p-6 md:p-8 ">
      <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
        <h1 className="text-xl font-medium text-gray-900 ">
          Створити аккаунт
          <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-500 text-xl">
            SmartCard
          </span>
        </h1>
        {errors?.root?.serverError.type === "403" && (
          <p className="text-center text-red-500 text-sm">
            Користувач з таким ніком або поштою вже існує
          </p>
        )}
        <div>
          <label
            htmlFor="text"
            className="block w-0 mb-2 texl-left text-sm font-medium text-gray-900 "
          >
            Ім'я
          </label>

          <p className="text-left text-red-500 text-sm">
            {errors.name?.message}
          </p>

          <input
            type="text"
            // name="name"
            className="text-black rounded w-full p-2.5 border border-black"
            placeholder="Keanu"
            // required
            {...register("name")}
          />
        </div>
        <div>
          <label
            htmlFor="text"
            className="block w-0 mb-2 text-sm font-medium text-gray-900 "
          >
            Прізвище
          </label>

          <p className="text-left text-red-500 text-sm">
            {errors.surname?.message}
          </p>

          <input
            type="text"
            //name="surname"
            id="surname"
            className="text-black rounded w-full p-2.5 border border-black"
            placeholder="Reeves"
            //required
            {...register("surname")}
          />
        </div>

        <div>
          <label
            htmlFor="text"
            className="block w-16 text-left mb-2 text-sm font-medium text-gray-900 "
          >
            Ваш нік
          </label>

          <p className="text-left text-red-500 text-sm">
            {errors.username?.message}
          </p>

          <input
            type="text"
            //name="nickname"
            id="username"
            className="text-black rounded w-full p-2.5 border border-black"
            placeholder="world_destroyer1337"
            //required
            {...register("username")}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block w-24  text-left mb-2 text-sm font-medium text-gray-900 "
          >
            Ваша пошта
          </label>

          <p className="text-left text-red-500 text-sm">
            {errors.email?.message}
          </p>

          <input
            type="email"
            //name="email"
            id="email"
            className="text-black rounded w-full p-2.5 border border-black"
            placeholder="name@company.com"
            //required
            {...register("email")}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block w-0 mb-2 text-sm font-medium text-gray-900 "
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
