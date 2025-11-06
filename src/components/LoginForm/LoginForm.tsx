import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./LoginForm.module.css";
import { useEffect, useState, type JSX } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { logIn } from "../../redux/auth/operation";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { FiEye, FiEyeOff } from "react-icons/fi";

const schema = yup
  .object({
   
    email: yup
      .string()
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z]{6,})(?=.*\d)[A-Za-z\d]+$/,
        "Password must consist of at least 6 English letters and 1 number"
      )
      .min(7, "Password must be at least 7 characters")
      .max(50, "Password must be at most 50 characters")
      .required("Password is required"),
  })
  .required();

interface FormData {
  
  email: string;
  password: string;
}

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  
  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const onSubmit = (data: FormData) => {
    dispatch(logIn(data));
    // console.log(data);
  };

  // 👇 Коли користувач логіниться — редирект на Dictionary qwerty1
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dictionary");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={css.wrapper}>
      <section className={css.title_wrap}>
        <h2 className={css.title}>Login</h2>
        <p className={css.descr}>
          Please enter your login details to continue using our service:
        </p>
      </section>
      {/* /* ** FORM ** */}
      <form onSubmit={handleSubmit(onSubmit)} className={css.register_form}>
        <div className={css.input_wrap}>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`${css.input_form} ${errors.email ? css.error : ""} ${
              !errors.email && watchEmail ? css.correct : ""
            }  `}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className={`${css.input_form} ${errors.password ? css.error : ""} ${
              !errors.password && watchPassword ? css.correct : ""
            }  `}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <button
                type="button"
                className={css.toggleBtn}
                onClick={() => setShowPassword((e) => !e)}
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
        </div>

        <button className={css.btn_register} type="submit">
          Login
        </button>
        <NavLink to="/register" type="button" className={css.link_login}>
          Register
        </NavLink>
      </form>
    </div>
  );
}
