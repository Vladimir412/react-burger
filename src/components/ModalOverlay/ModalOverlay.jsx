import modalOverlayStyles from "./ModalOverlay.module.css";
import { useHistory } from "react-router-dom";

const ModalOverlay = () => {
  const history = useHistory();

  const closeModal = () => {
    history.goBack();
  };

  return (
    <div className={modalOverlayStyles.container} onClick={closeModal}></div>
  );
};

export default ModalOverlay;
