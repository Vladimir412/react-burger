import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import loginStyles from "./Login.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
// import { useDispatch, useSelector } from "react-redux";
import { useState, FC, ChangeEvent, FormEvent } from "react";
import { signInUser } from "../../services/actions/auth";
import { TLogin, TLocation } from '../../utils/types/types'

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location: TLocation = useLocation()
  const { isLogged }: {isLogged: boolean} = useAppSelector((state) => state.authReducer);
  const [inputs, setInputs] = useState<TLogin>({ email: "", password: "" });
  const regEmail: RegExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(inputs);
    
    dispatch(signInUser(inputs));
    // dispatch(signInUser(inputs.email, inputs.password));
    setInputs({ email: "", password: "" });
  };
  
  const disabledButton: boolean =
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
            name="password"
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
