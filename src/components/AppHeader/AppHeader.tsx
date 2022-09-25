import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import headerStyles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header className={headerStyles.container}>
      <nav className={headerStyles.navigation}>
        <ul className={`${headerStyles.list}`}>
          <NavLink
            to="/"
            exact
            className={`${headerStyles.navLink} text text_color_inactive`}
            activeClassName={`${headerStyles.navLink_type_active}`}
          >
            <li className={headerStyles.item}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </li>
          </NavLink>
          <li className={`${headerStyles.item}`}>
            <ListIcon type="primary" />
            <p className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </p>
          </li>
        </ul>
        <div className={headerStyles.logo__container}>
          <Logo />
        </div>
        <div className={`${headerStyles.profile__container} mt-8`}>
          <NavLink
            to="/profile"
            className={`${headerStyles.navLink} text text_color_inactive`}
            activeClassName={`${headerStyles.navLink_type_active} `}
          >
            <ProfileIcon type="primary" />
            <p className="text text_type_main-default ml-2">Личный кабинет</p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
