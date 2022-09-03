import orderDetailsStyles from "./OrderDetails.module.css";
import { typesOfClosedModal } from "../../utils/types";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { modalOrderItemClosed } from '../../services/actions/actions'

const OrderDetails = () => {
  const { order } = useSelector(state => state.ingredientReducers)
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(modalOrderItemClosed(false))
  }

  return (
    <div className={orderDetailsStyles.container}>
      <p className="text text_type_digits-large">
        {order.order.number}
      </p>
      <p
        className={`${orderDetailsStyles.identity} text text_type_main-medium`}
      >
        идентификатор заказа
      </p>
      <button
        className={orderDetailsStyles.buttonImage}
        onClick={closeModal}
      ></button>
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
