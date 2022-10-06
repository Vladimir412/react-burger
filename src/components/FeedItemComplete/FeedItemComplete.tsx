import { FC } from "react";
import feedItemCompleteStyles from './FeedItemComplete.module.css';

type TFeedItemComplete = {
  title: string;
  quantity: number;
};

const FeedItemComplete: FC<TFeedItemComplete> = ({ title, quantity }) => {
  return (
    <div className={feedItemCompleteStyles.container}>
      <h1 className="text text_type_main-medium">{title}</h1>
      <p className="text text_type_digits-large">{quantity}</p>
    </div>
  );
};

export default FeedItemComplete;
