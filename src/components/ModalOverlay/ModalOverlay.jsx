import modalOverlayStyles from "./ModalOverlay.module.css";
import { useDispatch } from "react-redux";
import { modalOrderItemClosed, modalIngredientItemClosed } from '../../services/actions/actions'

const ModalOverlay = () => {

  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(modalOrderItemClosed(false))
    dispatch(modalIngredientItemClosed(false))
  }

  return (
    <div
      className={modalOverlayStyles.container}
      onClick={closeModal}
    ></div>
  );
};


export default ModalOverlay;
