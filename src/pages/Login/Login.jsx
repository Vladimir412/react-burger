import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import loginStyles from "./Login.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { signInUser } from "../../services/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()
  const { isLogged } = useSelector((state) => state.authReducer);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const regEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   if (isLogged) {
  //     history.push("/");
  //   }
  // }, [isLogged]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser(inputs.email, inputs.password));
    setInputs({ email: "", password: "" });
  };
  
  const disabledButton =
    inputs.email.match(regEmail) !== null && inputs.password.length >= 8
      ? false
      : true;

  if (isLogged) {
    return <Redirect to={location?.state?.from || '/'} />;
  }

  return (
    <div className={loginStyles.container}>
      <h1 className={`${loginStyles.title} text text_type_main-medium`}>
        Вход
      </h1>
      <form className={loginStyles.form} onSubmit={onHandleSubmit}>
        <div className={loginStyles.formInput}>
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            size="default"
            value={inputs.email}
            onChange={onChange}
          />
        </div>
        <div className={loginStyles.formInput}>
          <PasswordInput
            type="text"
            name="password"
            placeholder="Пароль"
            size="default"
            value={inputs.password}
            onChange={onChange}
          />
        </div>
        <div className={loginStyles.buttonSubmit}>
          <Button size="large" disabled={disabledButton}>
            Войти
          </Button>
        </div>
      </form>
      <div className={loginStyles.blockHelp}>
        <p
          className={`${loginStyles.blockHelp__text} text text_type_main-default`}
        >
          Вы — новый пользователь?
        </p>
        <Link
          to="/register"
          className={`${loginStyles.blockHelp__link} text text_type_main-default`}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div
        className={`${loginStyles.blockHelp} ${loginStyles.blockHelp_type_second}`}
      >
        <p
          className={`${loginStyles.blockHelp__text} text text_type_main-default`}
        >
          Забыли пароль?
        </p>
        <Link
          to="/forgot-password"
          className={`${loginStyles.blockHelp__link} text text_type_main-default`}
        >
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
};

export default Login;
