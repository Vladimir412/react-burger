import { FC, useEffect, ReactNode } from "react";
import feedItemStyles from "./FeedItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import FeedItemImage from "../FeedItemImage/FeedItemImage";
import { useAppSelector } from "../../utils/hooks";
import { identityStatus } from "../../utils/utils";
import { v4 as uuidv4 } from "uuid";

type TFeedItem = {
  id: string;
  order: string;
  time: string;
  title: string;
  price: number;
  images: Array<string>;
  key: string;
  path: string;
  statusOrder: string;
};

const FeedItem: FC<TFeedItem> = ({
  order,
  time,
  title,
  price,
  images,
  id,
  path,
  statusOrder,
}) => {
  const { ingredients } = useAppSelector((store) => store.ingredientReducers);
  const location = useLocation<string>();
  let imagesArray;
  let length = images.length;
  let left = -48;
  let width = 0;
  let picture: string = "";
  let quantity: number = 0;
  let quantityImages: number = 0;
  let keyId: string = "";

  const countItems =
    images &&
    images.reduce((acc: any, item: string) => {
      acc[item] = acc[item] ? acc[item] + 1 : 1; // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
      return acc;
    }, {});

  const result = Object.keys(countItems).map((item) => {
    return { id: item, quantity: countItems[item] };
  });

  imagesArray = result.map((i, index) => {
    ingredients.forEach((j) => {
      if (j._id === i.id) {
        picture = j.image;
        width += 48;
        // width += 64;
        length -= 1;
        left += 48;
        quantityImages = i.quantity;
      }
    });

    return (
      <li key={i.id}>
        {/* <li key={uuidv4()}> */}
        <FeedItemImage
          src={picture}
          left={left}
          length={length}
          quantityImages={quantityImages}
        />
      </li>
    );
  });

  let newArrayImages: Array<ReactNode> = [];

  if (imagesArray.length >= 6) {
    for (let i = 0; i < 6; i++) {
      newArrayImages.push(imagesArray[i]);
    }
    const quantity: number = imagesArray.length - newArrayImages.length;
    const { key } = imagesArray[5]
    const { left, length, src } = imagesArray[5].props.children.props;
    const element = (
      <li key={key}>
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

  const statusStyle =
    identityStatus(statusOrder) === "Выполнен"
      ? feedItemStyles.status_type_done
      : feedItemStyles.status_type_other;

  const containerStyle =
    path === "feed/"
      ? feedItemStyles.container_type_feed
      : feedItemStyles.container_type_order;

  return (
    <Link
      to={{
        pathname: `/${path}${id}`,
        state: { background: location },
      }}
      style={{ textDecoration: "none", color: "#F2F2F3" }}
    >
      <div className={containerStyle}>
        <div className={feedItemStyles.container__order}>
          <p className="text text_type_digits-default ml-1 mt-1">{order}</p>
          <p
            className={`${feedItemStyles.time} text text_type_main-default text_color_inactive mt-1`}
          >
            {time}
          </p>
        </div>
        <h1
          className={`${feedItemStyles.container__title} text text_type_main-medium ml-1`}
        >
          {title}
        </h1>
        {path === "profile/orders/" && (
          <p className={`${statusStyle} text text_type_main-default`}>
            {identityStatus(statusOrder)}
          </p>
        )}
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

// const FeedItem: FC<TFeedItem> = ({
//   order,
//   time,
//   title,
//   price,
//   images,
//   id,
//   path,
//   statusOrder,
// }) => {
//   const { ingredients } = useAppSelector((store) => store.ingredientReducers);
//   const location = useLocation<string>();
//   let imagesArray;
//   let length = images.length;
//   let left = -48;
//   let width = 0;
//   let picture: string = "";
//   let keyId: string = ""

//   imagesArray = images.map((i, index) => {
//     ingredients.forEach((j) => {
//       if (j._id === i) {
//         picture = j.image;
//         width += 48;
//         // width += 64;
//         length -= 1;
//         left += 48;
//       }
//     });

//     return (
//       <li key={index}>
//       {/* <li key={uuidv4()}> */}
//         <FeedItemImage src={picture} left={left} length={length} />
//       </li>
//     );
//   });

//   let newArrayImages: Array<ReactNode> = [];

//   if (imagesArray.length >= 6) {
//     for (let i = 0; i < 6; i++) {
//       newArrayImages.push(imagesArray[i]);
//     }
//     const quantity: number = imagesArray.length - newArrayImages.length;
//     const { left, length, src } = imagesArray[5].props.children.props;
//     const element = (
//       <li key={uuidv4()}>
//         <FeedItemImage
//           src={src}
//           left={left}
//           length={length}
//           quantity={quantity}
//           opacity={0.6}
//         />
//       </li>
//     );
//     newArrayImages.splice(5, 1, element);
//   } else {
//     newArrayImages = imagesArray;
//   }

//   const statusStyle =
//     identityStatus(statusOrder) === "Выполнен"
//       ? feedItemStyles.status_type_done
//       : feedItemStyles.status_type_other;

//   const containerStyle =
//     path === "feed/"
//       ? feedItemStyles.container_type_feed
//       : feedItemStyles.container_type_order;

//   return (
//     <Link
//       to={{
//         // pathname: `/${path}${order}`,
//         pathname: `/${path}${id}`,
//         state: { background: location },
//       }}
//       style={{ textDecoration: "none", color: "#F2F2F3" }}
//     >
//       <div className={containerStyle}>
//         <div className={feedItemStyles.container__order}>
//           <p className="text text_type_digits-default ml-1 mt-1">{order}</p>
//           <p
//             className={`${feedItemStyles.time} text text_type_main-default text_color_inactive mt-1`}
//           >
//             {time}
//           </p>
//         </div>
//         <h1
//           className={`${feedItemStyles.container__title} text text_type_main-medium ml-1`}
//         >
//           {title}
//         </h1>
//         {path === "profile/orders/" && (
//           <p className={`${statusStyle} text text_type_main-default`}>
//             {identityStatus(statusOrder)}
//           </p>
//         )}
//         <div className={feedItemStyles.container__info}>
//           <ul className={feedItemStyles.images}>{newArrayImages}</ul>
//           <div className={feedItemStyles.price}>
//             <p className="text text_type_digits-default mr-2">{price}</p>
//             <CurrencyIcon type="primary" />
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

export default FeedItem;
