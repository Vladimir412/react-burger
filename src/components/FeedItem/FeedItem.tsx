import { FC } from "react";
import feedItemStyles from "./FeedItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import FeedItemImage from "../FeedItemImage/FeedItemImage";
import { useAppSelector } from "../../utils/hooks";

type TFeedItem = {
  id: string;
  order: string;
  time: string;
  title: string;
  price: number;
  images: any;
  key: string;
};

const FeedItem: FC<TFeedItem> = ({ order, time, title, price, images }) => {
  const { ingredients } = useAppSelector((state) => state.ingredientReducers);
  const location = useLocation<string>();
  let imagesArray;
  // let length = images.length
  // let left = 0
  // let width = 0
  // console.log(images);

  imagesArray = ingredients.map((i: any) => {
    let length = images.length;
    let left = 0;
    let width = 0;
    width += 64;
    length -= 1;
    left += 48;
    console.log(length);
    
    return (
      <li key={i._id} style={{ width: width, zIndex: length }}>
        <FeedItemImage
          src={i.image}
        />
      </li>
    );
  });
  // console.log(imagesArray);

  return (
    <Link
      to={{
        pathname: `/feed/${order}`,
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
          <ul className={feedItemStyles.images}>
            {imagesArray}
            {/* <div className={feedItemStyles.gradient}><img className={feedItemStyles.image} src={images[0]} alt="" /></div>
            <div className={feedItemStyles.gradient__two}><img className={feedItemStyles.image} src={images[1]} alt="" /></div>
            <div className={feedItemStyles.gradient__three}><img className={feedItemStyles.image} src={images[2]} alt="" /></div> */}
          </ul>
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
