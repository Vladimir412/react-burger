import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import profileStyles from "./Profile.module.css";
import { logOutUser } from "../../services/actions/auth";
import { updateInfoAboutUser } from "../../services/actions/userInfo";
import { useDispatch, useSelector } from "react-redux";
import { TRegister } from "../../utils/types";

const Profile = () => {
  const { isLogged, accessToken } = useSelector(
    (state: any) => state.authReducer
  );
  const { name, email, isLoading } = useSelector(
    (state: any) => state.userReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const location: { state: string } = useLocation();
  const regEmail: RegExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  useEffect(() => {
    location.state = "/profile";
  }, []);

  const refreshToken: string | null = localStorage.getItem("refreshToken");

  const [initialInputs, setInitialInputs] = useState<TRegister>({
    name: name,
    email: email,
    password: "",
  });
  const [inputs, setInputs] = useState<TRegister>({ ...initialInputs });

  const valueMatch: boolean =
    initialInputs.name !== inputs.name ||
    initialInputs.email !== inputs.email ||
    initialInputs.password !== inputs.password
      ? true
      : false;

  useEffect(() => {
    if (!isLogged) {
      history.push("/login");
    }
  }, [isLogged]);

  const onChangeInputs = (e: { target: { name: string; value: string } }) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleLogOut = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    {/* @ts-ignore */}
    dispatch(logOutUser(refreshToken));
  };

  const handleUpdateDataUser = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setInitialInputs({ ...inputs });
    {/* @ts-ignore */}
    dispatch(updateInfoAboutUser({ ...inputs, accessToken }));
  };

  const handleReset = () => {
    setInputs({ ...initialInputs });
  };

  const disabledButton =
    inputs.password.length >= 8 &&
    inputs.email.match(regEmail) !== null &&
    valueMatch &&
    inputs.name.length > 0
      ? false
      : true;

  const stateButtonCancel =
    inputs.password !== initialInputs.password ||
    inputs.email !== initialInputs.email ||
    inputs.name !== initialInputs.name
      ? true
      : false;

  return (
    <section className={profileStyles.container}>
      <div>
        <ul className={profileStyles.listItem}>
          <li className={profileStyles.listItem__item}>
            <NavLink
              className={`${profileStyles.item} text text_type_main-medium`}
              activeClassName={profileStyles.item_type_active}
              to="/profile"
            >
              Профиль
            </NavLink>
          </li>
          <li className={profileStyles.listItem__item}>
            <NavLink
              className={`${profileStyles.item} text text_type_main-medium`}
              activeClassName={profileStyles.item_type_active}
              to="/profile/orders"
            >
              История заказов
            </NavLink>
          </li>
          <li className={profileStyles.listItem__item}>
            <button
              onClick={handleLogOut}
              className={`${profileStyles.buttonExit} text text_type_main-medium`}
            >
              Выход
            </button>
          </li>
        </ul>
      </div>
      <form
        className={profileStyles.inputsContainer}
        onSubmit={handleUpdateDataUser}
      >
        <Input
          value={inputs.name}
          name="name"
          onChange={onChangeInputs}
          placeholder="Имя"
          icon="EditIcon"
        />
        <div className={profileStyles.input}>
          <Input
            value={inputs.email}
            name="email"
            onChange={onChangeInputs}
            placeholder="Логин"
            icon="EditIcon"
          />
        </div>
        <div className={profileStyles.input}>
          <Input
            value={inputs.password}
            name="password"
            type="password"
            onChange={onChangeInputs}
            placeholder="Пароль"
            icon="EditIcon"
          />
        </div>
        <div className={profileStyles.buttonsForm}>
          <button
            type="button"
            className={
              stateButtonCancel
                ? profileStyles.buttonsForm__cancel
                : profileStyles.buttonsForm__cancel_type_hidden
            }
            onClick={handleReset}
          >
            Отмена
          </button>
          <Button type="primary" size="small" disabled={disabledButton}>
            {isLoading ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
