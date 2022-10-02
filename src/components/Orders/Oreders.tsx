import { NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import orderStyles from "./Order.module.css";
import { logOutUser } from "../../services/actions/auth";
import { updateInfoAboutUser } from "../../services/actions/userInfo";
import { useDispatch, useSelector } from "react-redux";
import { FC } from 'react'

const Orders: FC = () => {
  const { isLogged } = useSelector((state: any) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const refreshToken: string | null = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (!isLogged) {
      history.push("/login");
    }
  }, [isLogged]);


  const handleLogOut = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    {/* @ts-ignore */}
    dispatch(logOutUser(refreshToken));
  };


  return (
    <section className={orderStyles.container}>
      <div>
        <ul className={orderStyles.listItem}>
          <li className={orderStyles.listItem__item}>
            <NavLink
              className={`${orderStyles.item} text text_type_main-medium`}
              activeClassName={orderStyles.item_type_active}
              to="/profile"
              exact
            >
              Профиль
            </NavLink>
          </li>
          <li className={orderStyles.listItem__item}>
            <NavLink
              className={`${orderStyles.item} text text_type_main-medium`}
              activeClassName={orderStyles.item_type_active}
              to="/profile/orders"
            >
              История заказов
            </NavLink>
          </li>
          <li className={orderStyles.listItem__item}>
            <button
              onClick={handleLogOut}
              className={`${orderStyles.buttonExit} text text_type_main-medium`}
            >
              Выход
            </button>
          </li>
        </ul>
      </div>
      <div>
        <p style={{ color: "white" }}>ORDERS</p>
      </div>
    </section>
  );
};

export default Orders;
