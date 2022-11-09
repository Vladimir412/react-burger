import { FC, useEffect } from "react";
import feedStyles from "./Feed.module.css";
import FeedItem from "../FeedItem/FeedItem";
import FeedItemComplete from "../FeedItemComplete/FeedItemComplete";
import FeedItemOrderBoard from "../FeedItemOrderBoard/FeedItemOrderBoard";
import { completeAllTime, completeToday } from "../../utils/constans";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
  wsConnectClosed,
  wsConnectStart,
} from "../../services/actions/wsActionTypes";
import { countPrice, countTime, addZero } from "../../utils/utils";

const Feed: FC = () => {
  const { orders, total, totalToday, wsConnected } = useAppSelector(
    (state) => state.wsReducer
  );
  const { ingredients } = useAppSelector((state) => state.ingredientReducers);

  const dispatch = useAppDispatch();
  let items: any;

  useEffect(() => {
    dispatch(wsConnectStart({ name: "feed" }));
    console.log("Start feed");

    return () => {
      dispatch(wsConnectClosed());
      console.log("closed feed");
    };
  }, []);

  items = orders.map((i: any) => {
    // if (items && items.length > 1) {
    //   return items.map((j: any) => {
    //     if (j.id === i._id) {
    //       return {...j, quantityIngredients: j.quantityIngredients + 1}
    //     }
    //   })
    // }

    return (
      <li key={i._id}>
        <FeedItem
          id={i._id}
          order={`#${addZero(i.number)}`}
          time={countTime(i.createdAt)}
          title={i.name}
          price={countPrice(i.ingredients, ingredients)}
          images={i.ingredients}
          key={i._id}
          path={"feed/"}
          status={i.status}
          {...i}
        />
      </li>
    );
  });

  const orderNumberDone = orders.map((i: any) => {
    if (i.status === "done") {
      return (
        <li key={i._id} style={{ marginBottom: 8 }}>
          {addZero(i.number)}
        </li>
      );
    }
  });

  const orderNumberPending = orders.map((i: any) => {
    if (i.status === "pending") {
      return <li key={i._id}>{addZero(i.number)}</li>;
    }
  });

  const newOrderNumberPending = orderNumberPending.slice(0, 10);
  const newOrderNumberDone = orderNumberDone.slice(0, 10);

  return (
    <section>
      <h1 className={`${feedStyles.title} text text_type_main-large`}>
        Лента заказов
      </h1>
      <div className={feedStyles.container}>
        <div className={feedStyles.containerOrder}>
          <ul className={feedStyles.containerOrder__lists}>{items}</ul>
        </div>
        <div className={feedStyles.containerInfo}>
          <div className={feedStyles.containerInfo__lists}>
            <FeedItemOrderBoard
              title={"Готовы:"}
              children={newOrderNumberDone}
            />
            <FeedItemOrderBoard
              title={"В работе:"}
              children={newOrderNumberPending}
            />
          </div>
          <div className={feedStyles.containerInfo__statistic}>
            <FeedItemComplete title={completeAllTime} quantity={total} />
            <FeedItemComplete title={completeToday} quantity={totalToday} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feed;
