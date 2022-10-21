import { FC, ReactNode } from "react";
import feedItemOrderBoardStyles from "./FeedItemOrderBoard.module.css";

type TFeedItemOrderBoard = {
  title: string;
  children: ReactNode;
};

const FeedItemOrderBoard: FC<TFeedItemOrderBoard> = ({ title, children }) => {


  return (
    <div className={feedItemOrderBoardStyles.container}>
      <h1 className={`text text_type_main-medium`}>{title}</h1>
      <ul className={`${feedItemOrderBoardStyles.list} text text_type_digits-default`}>{children}</ul>
    </div>
  );
};

export default FeedItemOrderBoard;
