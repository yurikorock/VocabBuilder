import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <>
      <Header />
      <section className={css.hero_wrap}>
        <Hero />
      </section>
      <h3 className={css.support_text}>Word · Translation · Grammar · Progress</h3>
      <LoginForm />
    </>
  );
}
