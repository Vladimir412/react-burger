import { useEffect } from "react"
import { createPortal } from "react-dom"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import modaleStyles from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay"
import PropTypes from 'prop-types';
const modalRoot = document.getElementById('modals')
const buttonEscape = 'Escape';




const Modal = (props) => {

//закрытие попапа на кнопку Esc
    useEffect(() => {
        const closeOnEscape = (e) => {
          if (e.key === buttonEscape) {
            props.closeModal()
          }
        }
        document.addEventListener('keydown', closeOnEscape)
    
        return () => {
          document.removeEventListener('keydown', closeOnEscape)
        }
      }, [])

    const typeContainer = props.typeModal === "ingredient" ? modaleStyles.container : modaleStyles.container_type_order
    const typeHeader = props.typeModal === "ingredient" ? modaleStyles.header : modaleStyles.header_type_order

    return createPortal(
        <>
        <ModalOverlay  closeModal={props.closeModal}/>
        <div className={typeContainer}>
            <header className={typeHeader}>
                <h1 className={`text text_type_main-large ${modaleStyles.title}`}>{props.title}</h1>
                <button onClick={props.closeModal} className={modaleStyles.closeButton}>
                    <CloseIcon />
                </button>
            </header>
            {props.children}
        </div>
        </>,
        modalRoot
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
    closeModal: PropTypes.func,
    typeModal: PropTypes.string
}

export default Modal