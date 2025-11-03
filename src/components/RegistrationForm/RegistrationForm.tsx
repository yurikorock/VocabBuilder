import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./RegistrationForm.module.css";
import { useEffect, type JSX } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { register as registerUser } from "../../redux/auth/operation";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
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
  name: string;
  email: string;
  password: string;
}

export default function RegistrationForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const watchName = watch("name");
  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const onSubmit = (data: FormData) => {
    dispatch(registerUser(data));
    console.log(data);
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
        <h2 className={css.title}>Register</h2>
        <p className={css.descr}>
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </p>
      </section>
      {/* /* ** FORM ** */}
      <form onSubmit={handleSubmit(onSubmit)} className={css.register_form}>
        <div className={css.input_wrap}>
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className={`${css.input_form} ${errors.name ? css.error : ""} ${
              !errors.name && watchName ? css.correct : ""
            }  `}
          />
          {errors.name && <p>{errors.name.message}</p>}
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
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`${css.input_form} ${errors.password ? css.error : ""} ${
              !errors.password && watchPassword ? css.correct : ""
            }  `}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button className={css.btn_register} type="submit">
          Register
        </button>
        <NavLink to="/login" type="button" className={css.link_login}>
          Login
        </NavLink>
      </form>
    </div>
  );
}
