import { FC, ReactNode } from "react";
import feedItemOrderBoardStyles from "./FeedItemOrderBoard.module.css";

type TFeedItemOrderBoard = {
  title: string;
  children: ReactNode;
};

const FeedItemOrderBoard: FC<TFeedItemOrderBoard> = ({ title, children }) => {
  const color =
    title === "Готовы:"
      ? feedItemOrderBoardStyles.list_type_complete
      : feedItemOrderBoardStyles.list_type_inWork;

  return (
    <div className={feedItemOrderBoardStyles.container}>
      <h1 className={`text text_type_main-medium mt-1`}>{title}</h1>
      <ul className={`${color} text text_type_digits-default`}>{children}</ul>
    </div>
  );
};

export default FeedItemOrderBoard;
