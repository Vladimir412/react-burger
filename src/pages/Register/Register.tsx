import { Link, Redirect } from "react-router-dom";
import { useState, FC, ChangeEvent, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import registerStyles from "./Register.module.css";
import { signUpUser } from "../../services/actions/auth";
import { TRegister } from "../../utils/types/types";

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((store) => store.authReducer);
  const [inputs, setInputs] = useState<TRegister>({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(signUpUser({ ...inputs }));
    setInputs({ name: "", email: "", password: "" });
  };

  if (isLogged) {
    return <Redirect to="/" />;
  }

  return (
    <div className={registerStyles.container}>
      <h1 className={registerStyles.title}>Регистрация</h1>
      <form className={registerStyles.form} onSubmit={onHandleSubmit}>
        <div className={registerStyles.formInput}>
          <Input
            type="text"
            name="name"
            placeholder="Имя"
            size="default"
            value={inputs.name}
            onChange={onChange}
          />
        </div>
        <div className={registerStyles.formInput}>
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            size="default"
            value={inputs.email}
            onChange={onChange}
          />
        </div>
        <div className={registerStyles.formInput}>
          <Input
            type="password"
            name="password"
            placeholder="Пароль"
            size="default"
            value={inputs.password}
            onChange={onChange}
            icon={"ShowIcon"}
          />
        </div>
        <div className={registerStyles.buttonSubmit}>
          <Button size="large" htmlType={"button"}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className={registerStyles.blockHelp}>
        <p className={registerStyles.blockHelp__text}>Уже зарегистрированы?</p>
        <Link to="/login" className={registerStyles.blockHelp__link}>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
