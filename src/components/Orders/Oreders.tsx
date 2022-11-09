import { NavLink, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import orderStyles from "./Order.module.css";
import { logOutUser } from "../../services/actions/auth";
import { updateInfoAboutUser } from "../../services/actions/userInfo";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { FC } from "react";
import FeedItem from "../FeedItem/FeedItem";
import {
  wsConnectStart,
  wsConnectClosed,
} from "../../services/actions/wsActionTypes";
import { countPrice, countTime, addZero } from "../../utils/utils";

const Orders: FC = () => {
  const { isLogged, accessToken } = useAppSelector(
    (state) => state.authReducer
  );
  const { orders, wsConnected } = useAppSelector((state) => state.wsReducer);
  const { ingredients } = useAppSelector((state) => state.ingredientReducers);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const refreshToken: string = localStorage.getItem("refreshToken") || "";

  useEffect(() => {
    if (!isLogged) {
      history.push("/login");
    }
  }, [isLogged]);

  useEffect(() => {
    dispatch(wsConnectStart({ name: "orders", token: accessToken }));
    console.log("Start order");
    
    return () => {
      dispatch(wsConnectClosed());
      console.log("Closed order");
      
    };
  }, []);

  const items = orders.map((i: any) => {
    
    return (
      <li key={i._id} className={orderStyles.orgerConatiner__list}>
        <FeedItem
          id={i._id}
          order={`#${addZero(i.number)}`}
          time={countTime(i.createdAt)}
          title={i.name}
          price={countPrice(i.ingredients, ingredients)}
          images={i.ingredients}
          key={i._id}
          path={"profile/orders/"}
          {...i}
        />
      </li>
    );
  });

  const handleLogOut = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
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
      <div className={orderStyles.orderConatiner}>
        <ul style={{ listStyle: 'none' }}>{items}</ul>
      </div>
    </section>
  );
};

export default Orders;
