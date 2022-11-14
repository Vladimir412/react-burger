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
import {
  identityStatus,
  addZero,
  countTime,
  countPrice,
} from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { Location } from "history";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderInformation: FC<{ withoutModal?: string }> = ({ withoutModal }) => {
  const dispatch = useAppDispatch();
  const location = useLocation<{
    background?: Location<{} | null | undefined>;
  }>();
  const { isLogged } = useAppSelector(state => state.authReducer)  

  useEffect(() => {
    if (location.pathname.includes("/profile/orders/")) {
        dispatch(wsConnectStart("orders"));
        console.log("start profile/orders");
        
    } else {
    // if (location.pathname.startsWith('/feed') || !location?.state?.background) {
      setTimeout(() => {
        dispatch(wsConnectStart("feed"));
        console.log("Start information");
      }, 1000);
    }
              dispatch(wsConnectStart("orders"));
    // }
    return () => {
      dispatch(wsConnectClosed());
      console.log("closed information");
    };
  }, []);

  const { orders, myOrders } = useAppSelector((state) => state.wsReducer); // массив заказов
  const { ingredients } = useAppSelector((state) => state.ingredientReducers); // массив ингредиентов
  const orderId = useParams<{ id: string }>();
  const background = location?.state && location?.state?.background;
  let data: any = [];

  const order = location.pathname.includes("/feed")
    ? (orders &&
    orders.length > 0 &&
    orders.find((i: any) => i._id === orderId.id))
    : (myOrders &&
      myOrders.length > 0 &&
      myOrders.find((i: any) => i._id === orderId.id))

    // console.log(orders);
    console.log(myOrders);

  const countItems =
    order &&
    order.ingredients.reduce((acc: any, item: any) => {
      acc[item] = acc[item] ? acc[item] + 1 : 1; // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
      return acc;
    }, {});
    // console.log(countItems);
    

  const result = Object.keys(countItems).map((item) => {
    return { id: item, quantity: countItems[item] };
  });
  result.forEach((i: any) => {
    let image: string = "";
    let name: string = "";
    let price: number = 0;
    let id: string = "";
    let quantity: number = 1;
    ingredients.forEach((j: any) => {
      if (i.id === j._id) {
        id = j._id;
        name = j.name;
        price = j.price;
        image = j.image;
        quantity = i.quantity;
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

  // console.log(countItems);

  useEffect(() => {
    order && dispatch(wsSetTitle(addZero(order.number)));

    return () => {
      dispatch(wsSetTitle(""));
    };
  }, []);

  const statusStyle =
    identityStatus(order.status) === "Выполнен"
      ? orderInformationStyles.status_type_done
      : orderInformationStyles.status_type_other;

  const containerStyles = withoutModal
    ? orderInformationStyles.container_type_withOutModal
    : orderInformationStyles.container_type_withModal;

  const titleStyles = withoutModal
    ? orderInformationStyles.title_type_withOutModal
    : orderInformationStyles.title_type_withModal

    const infoStyles = withoutModal
    ? orderInformationStyles.info_type_withOutModal
    : orderInformationStyles.info_type_withModal

  if (orders && orders.length > 0) {
    return (
      <>
        <div className={`${containerStyles}`}>
          {/* <div className={`${orderInformationStyles.container}`}> */}
          {!background && (
            <p
              className={`${orderInformationStyles.orderNumber} text text_type_digits-default`}
            >
              {`#${addZero(order.number)}`}
            </p>
          )}
          <h1
            className={`${titleStyles} text text_type_main-medium`}
          >
            {order.name}
          </h1>
          <p className={`${statusStyle} text text_type_main-default`}>
            {identityStatus(order.status)}
          </p>
          <h2 className={`text text_type_main-medium mb-6`}>Состав:</h2>
          <ul className={orderInformationStyles.lists}>{data}</ul>
        </div>
        <div className={infoStyles}>
          <p className={`text text_type_main-default text_color_inactive`}>
            {countTime(order.createdAt)}
          </p>
          <div className={`${orderInformationStyles.price}`}>
            <p className="text text_type_digits-default mr-2">
              {countPrice(order.ingredients, ingredients)}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </>
    );
  } else {
    return <p style={{ color: "white" }}>Waiting...</p>;
  }
};

export default OrderInformation;
