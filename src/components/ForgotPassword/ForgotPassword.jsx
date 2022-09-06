import forgotPasswordStyles from "./ForgotPassword.module.css";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { recoveryPasswordUser } from "../../services/actions/auth";
import { useDispatch } from "react-redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(recoveryPasswordUser(email));
    setEmail("");
    history.push("/reset-password");
  };

  return (
    <div className={forgotPasswordStyles.container}>
      <h1 className={forgotPasswordStyles.title}>Восстановление пароля</h1>
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
          <Button size="large" onClick={onHandleSubmit}>
            Восстановить
          </Button>
        </div>
      </form>
      <div className={forgotPasswordStyles.blockHelp}>
        <p className={forgotPasswordStyles.blockHelp__text}>
          Вспомнили пароль?
        </p>
        <Link to="/login" className={forgotPasswordStyles.blockHelp__link}>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
