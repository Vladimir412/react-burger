import { FC } from "react";
import feedItemStyles from "./FeedItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

type TFeedItem = {
  id: string;
  time: string;
  title: string;
  price: number;
  images: any;
  key: string;
};

const FeedItem: FC<TFeedItem> = ({ id, time, title, price, images }) => {
  const location = useLocation<string>();

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
          <p className="text text_type_digits-default">{id}</p>
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
          <div className={feedItemStyles.images}>
            <div className={feedItemStyles.gradient}><img className={feedItemStyles.image} src={images[0]} alt="" /></div>
            <div className={feedItemStyles.gradient__two}><img className={feedItemStyles.image} src={images[1]} alt="" /></div>
            <div className={feedItemStyles.gradient__three}><img className={feedItemStyles.image} src={images[2]} alt="" /></div>
          </div>
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
