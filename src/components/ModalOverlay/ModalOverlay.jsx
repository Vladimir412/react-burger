import modalOverlayStyles from './ModalOverlay.module.css'
import PropTypes from 'prop-types';



const ModalOverlay = (props) => {

    return (
        <div className={modalOverlayStyles.container} onClick={props.closeModal}>
        </div>
    )
}

ModalOverlay.propTypes = {
    closeModal: PropTypes.func
}

export default ModalOverlay