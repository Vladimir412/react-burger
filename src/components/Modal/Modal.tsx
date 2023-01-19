import { useEffect, FC } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modaleStyles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { buttonEscape, modalRoot } from "../../utils/constans";
import { TModal } from "../../utils/types/types";

const Modal: FC<TModal> = ({ closeModal, title, children, stateHeader }) => {
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
            <h1 className={`text text_type_main-large ${modaleStyles.title}`}>
              {title}
            </h1>
            <button onClick={onCloseModal} className={modaleStyles.closeButton}>
              <CloseIcon type={"secondary"} />
            </button>
          </header>
        )}
        {!stateHeader && (<button onClick={onCloseModal} type="button" className={modaleStyles.closeButton}>
          <CloseIcon type={"secondary"} />
        </button>)}
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
