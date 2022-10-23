import { FC, useEffect } from "react";
import orderInformationStyles from "./OrderInformation.module.css";
import OrderInformationItem from "../OrderInformationItem/OrderInformationItem";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { useLocation, useParams } from "react-router-dom";
import {
  wsConnectClosed,
  wsConnectStart,
  wsSetTitle,
} from "../../services/actions/wsActionTypes";
import { identityStatus, addZero, countTime, countPrice } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { Location } from "history";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


const OrderInformation = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<{
    background?: Location<{} | null | undefined>;
  }>();

  useEffect(() => {
    dispatch(wsConnectStart("feed"));
    console.log("Start information");

    return () => {
      dispatch(wsConnectClosed());
      console.log("closed information");
    };
  }, []);

  const { orders } = useAppSelector((state) => state.wsReducer); // массив заказов
  const { ingredients } = useAppSelector((state) => state.ingredientReducers); // массив ингредиентов
  const orderId = useParams<{ id: string }>();
  const background = location?.state && location?.state?.background;
  let data: any = [];

  const order = orders.find((i: any) => i._id === orderId.id);

  order.ingredients.forEach((i: any) => {
    let image: string = "";
    let name: string = "";
    let price: number = 0;
    let id: string = "";
    let quantity: number = 1;
    ingredients.forEach((j: any) => {
      if (i === j._id) {
        id = j._id;
        name = j.name;
        price = j.price;
        image = j.image;
        quantity = 1;
      }
    });

    data.push(
      <li key={uuidv4()} id={id}>
        <OrderInformationItem
          image={image}
          title={name}
          price={price}
          quantity={quantity}
        />
      </li>
    );
  });

  useEffect(() => {
    dispatch(wsSetTitle(addZero(order.number)));

    return () => {
      dispatch(wsSetTitle(""));
    };
  }, []);

  const statusStyle =
    identityStatus(order.status) === "Выполнен"
      ? orderInformationStyles.status_type_done
      : orderInformationStyles.status_type_other;


  if (orders && order) {
  return (
    <>
    <div className={`${orderInformationStyles.container}`}>
      {!background && (
        <p
          className={`${orderInformationStyles.orderNumber} text text_type_digits-default`}
        >
          {`#${order.number}`}
        </p>
      )}
      <h1
        className={`${orderInformationStyles.title} text text_type_main-medium`}
      >
        {order.name}
      </h1>
      <p className={`${statusStyle} text text_type_main-default`}>
        {identityStatus(order.status)}
      </p>
      <h2 className={`text text_type_main-medium mb-6`}>Состав:</h2>
      <ul className={orderInformationStyles.lists}>{data}</ul>
    </div>
     <div className={orderInformationStyles.info}>
     <p className={`text text_type_main-default text_color_inactive`}>{countTime(order.createdAt)}</p>
     <div className={`${orderInformationStyles.price}`}>
       <p className="text text_type_digits-default mr-2">{countPrice(order.ingredients, ingredients)}</p>
       <CurrencyIcon type="primary" />
     </div>
   </div>
   </>
  )
  } else {
    return <p>GGGGG</p>
  }
};

export default OrderInformation;
