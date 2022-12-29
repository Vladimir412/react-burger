import preloaderStyles from "./Preloader.module.css";
import { FC } from "react";

const Preloader: FC = () => {
  return <div className={preloaderStyles.loader}>Loading...</div>;
};

export default Preloader;
