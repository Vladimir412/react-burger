import { useEffect, FunctionComponent } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modaleStyles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { buttonEscape, modalRoot } from '../../utils/constans'
import { TModal } from '../../utils/types'
import { useDispatch } from "react-redux";
import {
  modalOrderItemClosed,
  modalIngredientItemClosed,
} from "../../services/actions/actions";

const Modal: FunctionComponent<TModal> = ({ closeModal, title, children}) => {
  //закрытие попапа на кнопку Esc
  useEffect(() => {
    const closeOnEscape = (e: { key: string; }) => {
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
    title.length > 0
      ? modaleStyles.container
      : modaleStyles.container_type_order;
  const typeHeader =
    title.length > 0
      ? modaleStyles.header
      : modaleStyles.header_type_order;

  return createPortal(
    <>
      <ModalOverlay />
      <div className={typeContainer}>
        <header className={typeHeader}>
          <h1 className={`text text_type_main-large ${modaleStyles.title}`}>
            {title}
          </h1>
          <button onClick={onCloseModal} className={modaleStyles.closeButton}>
            <CloseIcon type={"secondary"} />
          </button>
        </header>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
