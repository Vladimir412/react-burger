import modalOverlayStyles from './ModalOverlay.module.css'
import PropTypes from 'prop-types';



const ModalOverlay = (props) => {


    return (
        <section className={modalOverlayStyles.container} onClick={props.closeModal}>
        </section>
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func
}

export default ModalOverlay