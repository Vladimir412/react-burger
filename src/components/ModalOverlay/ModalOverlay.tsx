import modalOverlayStyles from "./ModalOverlay.module.css";
import { useHistory } from "react-router-dom";
import { FC } from 'react'

const ModalOverlay: FC = () => {
  const history: {goBack: () => void} = useHistory();

  const closeModal = (): void => {
    history.goBack();
  };

  return (
    <div className={modalOverlayStyles.container} onClick={closeModal}></div>
  );
};

export default ModalOverlay;
