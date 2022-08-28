import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modaleStyles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { modalOrderItemClosed, modalIngredientItemClosed } from '../../services/actions/actions'
const modalRoot = document.getElementById("modals");
const buttonEscape = "Escape";

const Modal = (props) => {

  const dispatch = useDispatch()

  //закрытие попапа на кнопку Esc
  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === buttonEscape) {
        closeModal()
      }
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const closeModal = () => {
    props.closeModal()
    dispatch(modalOrderItemClosed(false))
    dispatch(modalIngredientItemClosed(false))
  }

  const typeContainer =
    props.typeModal === "ingredient"
      ? modaleStyles.container
      : modaleStyles.container_type_order;
  const typeHeader =
    props.typeModal === "ingredient"
      ? modaleStyles.header
      : modaleStyles.header_type_order;

  return createPortal(
    <>
      <ModalOverlay/>
      <div className={typeContainer}>
        <header className={typeHeader}>
          <h1 className={`text text_type_main-large ${modaleStyles.title}`}>
            {props.title}
          </h1>
          <button
            onClick={closeModal}
            className={modaleStyles.closeButton}
          >
            <CloseIcon />
          </button>
        </header>
        {props.children}
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  typeModal: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
