import modalOverlayStyles from "./ModalOverlay.module.css";
import { typesOfOpenModalIngredient } from "../../utils/types";

const ModalOverlay = (props) => {
  return (
    <div
      className={modalOverlayStyles.container}
      onClick={props.closeModal}
    ></div>
  );
};

ModalOverlay.propTypes = {
  closeModal: typesOfOpenModalIngredient,
};

export default ModalOverlay;
