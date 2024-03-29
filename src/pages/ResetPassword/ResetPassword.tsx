import { FC, useState, ChangeEvent, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { resetPasswordUser } from "../../services/actions/auth";
import resetPasswordStyles from "./ResetPassword.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TLocation, TResetPassword } from "../../utils/types/types";

/* @ts-ignore */
const ResetPassword: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location: TLocation = useLocation();
  const [inputs, setInputs] = useState<TResetPassword>({
    password: "",
    token: "",
  });
  const { isLogged } = useAppSelector((store) => store.authReducer);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(resetPasswordUser(inputs.password, inputs.token));
    setInputs({ password: "", token: "" });
    history.push("/login", { state: null });
  };

  const disabledButton: boolean =
    inputs.password.length >= 8 && inputs.token.length >= 36 ? false : true;

  if (isLogged) {
    return <Redirect to="/" />;
  } else if (location.state === undefined) {
    return <Redirect to={"/login"} />;
  } else if (location.state.from === "/forgot-password") {
    return (
      <div className={resetPasswordStyles.container}>
        <h1
          className={`${resetPasswordStyles.title} text text_type_main-medium`}
        >
          Восстановление пароля
        </h1>
        <form className={resetPasswordStyles.form} onSubmit={onHandleSubmit}>
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
            <Button size="medium" disabled={disabledButton} htmlType={"submit"}>
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
            to={{ pathname: "/login", state: null }}
            className={`${resetPasswordStyles.blockHelp__link} text text_type_main-default`}
          >
            Войти
          </Link>
        </div>
      </div>
    );
  }
};

export default ResetPassword;
