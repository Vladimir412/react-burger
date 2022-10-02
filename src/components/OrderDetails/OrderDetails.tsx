import orderDetailsStyles from "./OrderDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";

const OrderDetails: FC = () => {
  const { order } = useSelector((state: any) => state.ingredientReducers);

  return (
    <div className={orderDetailsStyles.container}>
      <p className="text text_type_digits-large">{order.order.number}</p>
      <p
        className={`${orderDetailsStyles.identity} text text_type_main-medium`}
      >
        идентификатор заказа
      </p>
      <button className={orderDetailsStyles.buttonImage}></button>
      <p className={`${orderDetailsStyles.status} text text_type_main-default`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${orderDetailsStyles.wait} text text_type_main-default`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
