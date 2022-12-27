import { useEffect, FC, KeyboardEvent, BaseSyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modaleStyles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { buttonEscape, modalRoot } from "../../utils/constans";
import { TIngredient, TModal } from "../../utils/types/types";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { addZero } from "../../utils/utils";

const Modal: FC<TModal> = ({ closeModal, title, children, stateHeader }) => {
  const location = useLocation();
  const { orders } = useAppSelector((store) => store.wsReducer);  
  const { myOrders } = useAppSelector((store) => store.wsReducerMy)
  // const { orders } = useAppSelector((state) => state.wsReducer);  
  const { id } = useParams<{id: string}>()
  const order = location.pathname.includes("/profile/orders/")
  ? myOrders.find(i => i._id === id)  
  : orders.find(i => i._id === id)  
  
  
  

  //закрытие попапа на кнопку Esc
  useEffect(() => {
    const closeOnEscape = (e: { key: string }) => {
      if (e.key === buttonEscape) {
        closeModal();
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const onCloseModal = () => {
    closeModal();
  };

  const typeContainer =
    title && title.length > 0
      ? modaleStyles.container
      : modaleStyles.container_type_order;
  const typeHeader =
    title && title.length > 0
      ? modaleStyles.header
      : modaleStyles.header_type_order;

    const typeTitle = (
      order !== undefined &&
      order.number
      // numberOrder.length > 0
      ? `${modaleStyles.title} text text_type_digits-default`
      : `text text_type_main-large ${modaleStyles.title}`)         

  return createPortal(
    <>
      <ModalOverlay />
      <div className={typeContainer}>
        {stateHeader && (
            <header className={typeHeader}>
              <h1 className={typeTitle}>
                {title}
              </h1>
              <button
                onClick={onCloseModal}
                className={modaleStyles.closeButton}
              >
                <CloseIcon type={"secondary"} />
              </button>
            </header>
          )}
          {order !== undefined && order.number && (
          // {numberOrder.length > 0 && (
            <header className={typeHeader}>
              <h1 className={typeTitle}>
                {`#${addZero(order.number)}`}
              </h1>
              <button
                onClick={onCloseModal}
                className={modaleStyles.closeButton}
              >
                <CloseIcon type={"secondary"} />
              </button>
            </header>
          )}
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
