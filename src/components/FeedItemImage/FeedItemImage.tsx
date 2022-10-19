import feedItemImageStyles from "./FeedItemImage.module.css";
import { FC } from "react";

const FeedItemImage: FC<any> = (props) => {
  // console.log(props);

  return (
    <div
      className={feedItemImageStyles.gradient}
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
