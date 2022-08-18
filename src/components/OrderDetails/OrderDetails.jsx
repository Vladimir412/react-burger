import orderDetailsStyles from "./OrderDetails.module.css";
import { typesOfClosedModal } from "../../utils/types";
import PropTypes from "prop-types";

const OrderDetails = (props) => {
  return (
    <div className={orderDetailsStyles.container}>
      <p className="text text_type_digits-large">
        {props.dataOrderModal.order.number}
      </p>
      <p
        className={`${orderDetailsStyles.identity} text text_type_main-medium`}
      >
        идентификатор заказа
      </p>
      <button
        className={orderDetailsStyles.buttonImage}
        onClick={props.closeModal}
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

OrderDetails.propTypes = {
  closeModal: typesOfClosedModal,
  dataOrderModal: PropTypes.shape({
    name: PropTypes.string,
    order: PropTypes.shape({
      number: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default OrderDetails;
