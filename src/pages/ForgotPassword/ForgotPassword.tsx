import forgotPasswordStyles from "./ForgotPassword.module.css";
import { useState, FC } from "react";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { recoveryPasswordUser } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ForgotPassword: FC = () => {
  const dispatch: string | any = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const regEmail: RegExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const { isLogged } = useSelector((state: any) => state.authReducer);

  const [email, setEmail] = useState<string>("");

  const onChangeEmail = (e: {target: {value: string}}) => {
    setEmail(e.target.value);
  };

  const onHandleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(recoveryPasswordUser(email));
    setEmail("");
    history.push("/reset-password", { from: location.pathname });
  };

  const disabledButton: boolean = email.match(regEmail) === null ? true : false;

  if (isLogged) {
    return <Redirect to="/" />;
  }

  return (
    <div className={forgotPasswordStyles.container}>
      <h1
        className={`${forgotPasswordStyles.title} text text_type_main-medium`}
      >
        Восстановление пароля
      </h1>
      <form className={forgotPasswordStyles.form}>
        <div className={forgotPasswordStyles.formInput}>
          <Input
            type="email"
            name="email"
            placeholder="Укажите e-mail"
            size="default"
            value={email}
            onChange={onChangeEmail}
          />
        </div>
        <div className={forgotPasswordStyles.buttonSubmit}>
          <Button
            size="medium"
            onClick={onHandleSubmit}
            disabled={disabledButton}
          >
            Восстановить
          </Button>
        </div>
      </form>
      <div className={forgotPasswordStyles.blockHelp}>
        <p
          className={`${forgotPasswordStyles.blockHelp__text} text text_type_main-default`}
        >
          Вспомнили пароль?
        </p>
        <Link
          to="/login"
          className={`${forgotPasswordStyles.blockHelp__link} text text_type_main-default`}
        >
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
