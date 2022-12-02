import feedItemImageStyles from "./FeedItemImage.module.css";
import { FC } from "react";

type TFeedItemImage = {
  left?: number;
  length?: number;
  src: string | undefined;
  zIndex?: number;
  quantity?: number;
  opacity?: number;
}

const FeedItemImage: FC<TFeedItemImage> = (props) => {
  
  const styleContainer = !props.left && !props. zIndex
  ? feedItemImageStyles.gradient_type_relative
  : feedItemImageStyles.gradient

  return (
    <div
      className={styleContainer}
      style={{ left: props.left, zIndex: props.length }}
    >
      {props.quantity && (
        <span
          className={feedItemImageStyles.quantity}
        >{`+${props.quantity}`}</span>
      )}
      <img
        className={feedItemImageStyles.image}
        src={props.src}
        alt="Ингредиент"
        style={{ opacity: props.opacity }}
      />
    </div>
  );
};

export default FeedItemImage;
