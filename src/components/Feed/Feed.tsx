import { FC, useEffect } from "react";
import feedStyles from "./Feed.module.css";
import FeedItem from "../FeedItem/FeedItem";
import FeedItemComplete from "../FeedItemComplete/FeedItemComplete";
import FeedItemOrderBoard from "../FeedItemOrderBoard/FeedItemOrderBoard";
import { completeAllTime, completeToday } from "../../utils/constans";
import { wsUrl } from "../../utils/constans";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
  wsGetMessage,
  wsConnectSuccess,
  wsConnectClosed,
  wsConnectStart,
} from "../../services/actions/wsActionTypes";
import wsReducer from "../../services/reducers/wsReducer";
import { v4 as uuidv4 } from "uuid";

const Feed: FC = () => {
  const { orders, wcConnected, total, totalToday } = useAppSelector(
    (state) => state.wsReducer
  );
  const { ingredients } = useAppSelector((state) => state.ingredientReducers);
  
  const dispatch = useAppDispatch();
  let items: any;

  useEffect(() => {
    dispatch(wsConnectStart());
    console.log("Start");

    return () => {
      dispatch(wsConnectClosed());
      console.log("closed");
    };
  }, []);

  const countTime = (time: string) => {
    let result: string;
    const timeResult: string = time.slice(11, 16);
    const currentDate: number = Date.parse(Date());
    const days: number = (currentDate - Date.parse(time)) / 86400000;
    const day: number = Math.round(days);
    if (day === 0) {
      result = "Сегодня";
    } else if (day === 1) {
      result = "Вчера";
    } else if (day >= 2 && day <= 4) {
      result = `${day} дня назад`;
    } else if (day >= 5 && day <= 7) {
      result = `${day} дней назад`;
    } else {
      result = "Болше недели назад";
    }

    return `${result}, ${timeResult} i-GMT+3`;
  };

  const countPrice = (item: any) => {
    let totalPrice: number = 0

    item.forEach((i: any) => {      
      ingredients.forEach((j: any) => {
        if (j._id === i) {
          totalPrice += j.price
        }
      })
    })
    return totalPrice
  }

  items = orders.map((i: any) => {
    
    return (
      <li key={i._id}>
        <FeedItem
          id={i._id}
          order={`#${i.number}`}
          time={countTime(i.createdAt)}
          title={i.name}
          price={countPrice(i.ingredients)}
          // price={480}
          images={i.ingredients}
          key={i._id}
          {...i}
        />
      </li>
    );
  });

  const item = (
    <li>
      <FeedItem
        id={"#034535"}
        order={"#034535"}
        time={"Сегодня, 16:20 i-GMT+3"}
        title={"Death Star Starship Main бургер"}
        price={480}
        images={[
          "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
          "https://code.s3.yandex.net/react/code/core-mobile.png",
        ]}
        key={"0654645"}
      />
    </li>
  );

  return (
    <section>
      <h1 className={feedStyles.title}>Лента заказов</h1>
      <div className={feedStyles.container}>
        <div className={feedStyles.containerOrder}>
          <ul className={feedStyles.containerOrder__lists}>{items}</ul>
        </div>
        <div className={feedStyles.containerInfo}>
          <div className={feedStyles.containerInfo__lists}>
            <FeedItemOrderBoard title={"Готовы:"} children={<li></li>} />
            <FeedItemOrderBoard title={"В работе:"} children={<li></li>} />
          </div>
          <FeedItemComplete title={completeAllTime} quantity={total} />

          <FeedItemComplete title={completeToday} quantity={totalToday} />
        </div>
      </div>
    </section>
  );
};

export default Feed;
