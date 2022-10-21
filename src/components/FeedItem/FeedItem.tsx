import { FC } from "react";
import feedItemStyles from "./FeedItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import FeedItemImage from "../FeedItemImage/FeedItemImage";
import { useAppSelector } from "../../utils/hooks";
import { v4 as uuidv4 } from "uuid";

type TFeedItem = {
  id: string;
  order: string;
  time: string;
  title: string;
  price: number;
  images: any;
  key: string;
};

const FeedItem: FC<TFeedItem> = ({ order, time, title, price, images, id }) => {
  const { ingredients } = useAppSelector((state) => state.ingredientReducers);
  const location = useLocation<string>();
  let imagesArray;
  let length = images.length;
  let left = -48;
  let width = 0;
  let picture: string = "";

  imagesArray = images.map((i: any) => {
    ingredients.forEach((j: any) => {
      if (j._id === i) {
        picture = j.image;
        width += 48;
        // width += 64;
        length -= 1;
        left += 48;
      }
    });

    return (
      <li key={uuidv4()}>
        <FeedItemImage src={picture} left={left} length={length} />
      </li>
    );
  });

  let newArrayImages: any = [];

  if (imagesArray.length >= 6) {
    for (let i = 0; i < 6; i++) {
      newArrayImages.push(imagesArray[i]);
    }
    const quantity: number = imagesArray.length - newArrayImages.length;
    const { left, length, src } = imagesArray[5].props.children.props;
    const element = (
      <li key={uuidv4()}>
        <FeedItemImage
          src={src}
          left={left}
          length={length}
          quantity={quantity}
          opacity={0.6}
        />
      </li>
    );
    newArrayImages.splice(5, 1, element);
  } else {
    newArrayImages = imagesArray;
  }

  return (
    <Link
      to={{
        pathname: `/feed/${id}`,
        // state: { background: location },
      }}
      style={{ textDecoration: "none", color: "#F2F2F3" }}
    >
      <div className={feedItemStyles.container}>
        <div className={feedItemStyles.container__order}>
          <p className="text text_type_digits-default">{order}</p>
          <p className="text text_type_main-default text_color_inactive">
            {time}
          </p>
        </div>
        <h1
          className={`${feedItemStyles.container__title} text text_type_main-medium`}
        >
          {title}
        </h1>
        <div className={feedItemStyles.container__info}>
          <ul className={feedItemStyles.images}>{newArrayImages}</ul>
          <div className={feedItemStyles.price}>
            <p className="text text_type_digits-default mr-2">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeedItem;
