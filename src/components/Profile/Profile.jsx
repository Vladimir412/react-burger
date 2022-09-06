import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import profileStyles from "./Profile.module.css";
import { logOutUser } from "../../services/actions/auth";
import { updateInfoAboutUser } from "../../services/actions/userInfo";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { isLogged, accessToken } = useSelector((state) => state.authReducer);
  const { name, email, isLoading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const refreshToken = localStorage.getItem("refreshToken");
  const [initialInputs, setInitialInputs] = useState({
    name: name,
    email: email,
    password: "",
  });
  const [inputs, setInputs] = useState(initialInputs);

  useEffect(() => {
    if (!isLogged) {
      history.push("/login");
    }
  }, [isLogged]);

  const onChangeInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOutUser(refreshToken));
  };

  const handleUpdateDataUser = (e) => {
    e.preventDefault();
    setInitialInputs({ ...inputs });
    dispatch(updateInfoAboutUser({ ...inputs, accessToken }));
  };

  const handleReset = () => {
    setInputs({ ...initialInputs });
  };

  const disabledButton = (inputs.password.length < 8 ? true : false)

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
      <form className={profileStyles.inputsContainer}>
        <Input
          value={inputs.name}
          name="name"
          onChange={onChangeInputs}
          placeholder="Имя"
          icon="EditIcon"
          required
        />
        <div className={profileStyles.input}>
          <Input
            value={inputs.email}
            name="email"
            onChange={onChangeInputs}
            placeholder="Логин"
            icon="EditIcon"
            required
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
            required
          />
        </div>
        <div className={profileStyles.buttonsForm}>
          <button
            type="button"
            className={profileStyles.buttonsForm__cancel}
            onClick={handleReset}
          >
            Отмена
          </button>
          <Button
            type="primary"
            size="small"
            onClick={handleUpdateDataUser}
            disabled={disabledButton}
          >
            {isLoading ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
