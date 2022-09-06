import { Link, useHistory } from "react-router-dom";
import loginStyles from "./Login.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { signInUser } from "../../services/actions/auth";
import { loginUserItemRedirect } from "../../services/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLogged } = useSelector((state) => state.authReducer);
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLogged) {
    history.push('/')
    }
  }, [isLogged])

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser(inputs.email, inputs.password));
    setInputs({ email: "", password: "" })
  };

  return (
    <div className={loginStyles.container}>
      <h1 className={loginStyles.title}>Вход</h1>
      <form className={loginStyles.form}>
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
          <Button size="large" onClick={onHandleSubmit}>
            Войти
          </Button>
        </div>
      </form>
      <div className={loginStyles.blockHelp}>
        <p className={loginStyles.blockHelp__text}>Вы — новый пользователь?</p>
        <Link to="/register" className={loginStyles.blockHelp__link}>
          Зарегистрироваться
        </Link>
      </div>
      <div className={loginStyles.blockHelp}>
        <p className={loginStyles.blockHelp__text}>Забыли пароль?</p>
        <Link to="/forgot-password" className={loginStyles.blockHelp__link}>
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
};

export default Login;
