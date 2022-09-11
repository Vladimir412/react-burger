import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import registerStyles from "./Register.module.css";
import { signUpUser } from "../../services/actions/auth";

const Register = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector(state => state.authReducer)
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser(inputs.email, inputs.password, inputs.name));
    setInputs({ name: "", email: "", password: "" });
  };

  if (isLogged) {
    return <Redirect to='/' />
  }

  return (
    <div className={registerStyles.container}>
      <h1 className={registerStyles.title}>Регистрация</h1>
      <form className={registerStyles.form}>
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
          <Button size="large" onClick={onHandleSubmit}>
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
