import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import { resetPasswordUser } from "../../services/actions/auth";
import resetPasswordStyles from "./ResetPassword.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ password: "", token: "" });
  const { isLogged } = useSelector((state) => state.authReducer);

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordUser(inputs.password, inputs.token));
    setInputs({ password: "", token: "" });
  };

  const disabledButton =
    inputs.password.length >= 8 && inputs.token.length >= 36 ? false : true;

  if (isLogged) {
    return <Redirect to="/" />;
  }

  return (
    <div className={resetPasswordStyles.container}>
      <h1 className={`${resetPasswordStyles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h1>
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
          <Button
            size="medium"
            onClick={onHandleSubmit}
            disabled={disabledButton}
          >
            Сохранить
          </Button>
        </div>
      </form>
      <div className={resetPasswordStyles.blockHelp}>
        <p
          className={`${resetPasswordStyles.blockHelp__text} text text_type_main-default`}
        >
          Вспомнили пароль?
        </p>
        <Link
          to="/login"
          className={`${resetPasswordStyles.blockHelp__link} text text_type_main-default`}
        >
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
