import { useEffect, FC } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modaleStyles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { buttonEscape, modalRoot } from "../../utils/constans";
import { TModal } from "../../utils/types/types";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { addZero } from "../../utils/utils";

const Modal: FC<TModal> = ({ closeModal, title, children, stateHeader }) => {
  // const location = useLocation();
  // const { orders } = useAppSelector((store) => store.wsReducer);
  // const { myOrders } = useAppSelector((store) => store.wsReducerMy);
  // const { id } = useParams<{ id: string }>();
  // const order = location.pathname.includes("/profile/orders/")
  //   ? myOrders.find((i) => i._id === id)
  //   : orders.find((i) => i._id === id);

  //закрытие попапа на кнопку Esc
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
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

  return createPortal(
    <>
      <ModalOverlay />
      <div className={typeContainer}>
        {stateHeader && (
          <header className={typeHeader}>
            <h1 className={`text text_type_main-large ${modaleStyles.title}`}>{title}</h1>
            <button onClick={onCloseModal} className={modaleStyles.closeButton}>
              <CloseIcon type={"secondary"} />
            </button>
          </header>
        )}
            <button onClick={onCloseModal} className={modaleStyles.closeButton}>
              <CloseIcon type={"secondary"} />
            </button>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
