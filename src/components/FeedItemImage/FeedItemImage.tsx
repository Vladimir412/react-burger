import feedItemImageStyles from "./FeedItemImage.module.css";
import { FC } from "react";

const FeedItemImage: FC<any> = (props) => {

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
