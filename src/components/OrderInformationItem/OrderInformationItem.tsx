import { FC } from "react";
import orderInformationItemStyles from "./OrderInformationItem.module.css";
import FeedItemImage from "../FeedItemImage/FeedItemImage";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TOrderInformationItem = {
  title?: string;
  image?: string;
  price?: number;
  id?: string;
  quantity?: number
};

const OrderInformationItem: FC<TOrderInformationItem> = ({
  title,
  image,
  price,
  quantity,
}) => {


  return (
    <div className={orderInformationItemStyles.container}>
      <div className={orderInformationItemStyles.image}>
        <FeedItemImage src={image} />
      </div>
      <h1
        className={`${orderInformationItemStyles.title} text text_type_main-default ml-3`}
      >
        {title}
      </h1>
      <div className={`${orderInformationItemStyles.price} mr-5`}>
        <p
          className={`${orderInformationItemStyles.quantity} ml-2 mr-2 text text_type_digits-default`}
        >{`${quantity} x ${price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default OrderInformationItem;
