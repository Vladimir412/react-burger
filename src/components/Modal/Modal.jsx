import { createPortal } from "react-dom"
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import modaleStyles from './Modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay"
import PropTypes from 'prop-types';
const modalRoot = document.getElementById('modals')



const Modal = (props) => {

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
    closeModal: PropTypes.func
}

export default Modal