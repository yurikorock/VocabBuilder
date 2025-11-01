import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./RegistrationForm.module.css";
import type { JSX } from "react";
import { NavLink } from "react-router-dom";

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
        /^(?=(?:.*[A-Za-z]){6,})(?=.*\d)[A-Za-z\d]{7,}$/,
        "Password must contain at least 6 letters and 1 number"
      )
      .min(8, "Password must be at least 8 characters")
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => console.log(data);

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
        <input type="text" placeholder="Name" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit">Register</button>
        <NavLink to="/login" type="button">Login</NavLink>
      </form>
    </div>
  );
}
