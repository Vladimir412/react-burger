import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { resetPasswordUser } from "../../services/actions/auth";
import resetPasswordStyles from "./ResetPassword.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ password: "", token: "" });

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordUser(inputs.password, inputs.token));
    setInputs({ password: "", token: "" })
  };

  return (
    <div className={resetPasswordStyles.container}>
      <h1 className={resetPasswordStyles.title}>Восстановление пароля</h1>
      <form className={resetPasswordStyles.form}>
        <div className={resetPasswordStyles.formInput}>
          <Input
            type="text"
            name="password"
            placeholder="Введите новый пароль"
            size="default"
            value={inputs.password}
            onChange={onChange}
            icon={"ShowIcon"}
          />
        </div>
        <div className={resetPasswordStyles.formInput}>
          <Input
            type="text"
            name="token"
            placeholder="Введите код из письма"
            size="default"
            value={inputs.token}
            onChange={onChange}
          />
        </div>
        <div className={resetPasswordStyles.buttonSubmit}>
          <Button size="large" onClick={onHandleSubmit}>
            Сохранить
          </Button>
        </div>
      </form>
      <div className={resetPasswordStyles.blockHelp}>
        <p className={resetPasswordStyles.blockHelp__text}>Вспомнили пароль?</p>
        <Link to="/login" className={resetPasswordStyles.blockHelp__link}>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
