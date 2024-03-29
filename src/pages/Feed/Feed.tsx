import { FC, ReactNode, useEffect } from "react";
import feedStyles from "./Feed.module.css";
import FeedItem from "../../components/FeedItem/FeedItem";
import FeedItemComplete from "../../components/FeedItemComplete/FeedItemComplete";
import FeedItemOrderBoard from "../../components/FeedItemOrderBoard/FeedItemOrderBoard";
import { completeAllTime, completeToday } from "../../utils/constans";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
  wsConnectClosed,
  wsConnectStart,
} from "../../services/actions/wsActionTypes";
import { countPrice, countTime, addZero } from "../../utils/utils";
import { wsUrl } from "../../utils/constans";

const Feed: FC = () => {
  const { orders, total, totalToday } = useAppSelector(
    (store) => store.wsReducer
  );
  const { ingredients } = useAppSelector((store) => store.ingredientReducers);

  const dispatch = useAppDispatch();
  let items: Array<ReactNode>;

  useEffect(() => {
    setTimeout(() => {
      dispatch(wsConnectStart(`${wsUrl}/all`));
    }, 1000);

    return () => {
      dispatch(wsConnectClosed());
    };
  }, []);

  items = orders.map((i) => {
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
          statusOrder={i.status}
          {...i}
        />
      </li>
    );
  });

  const orderNumberDone = orders.map((i) => {
    if (i.status === "done") {
      return (
        <li key={i._id} style={{ marginBottom: 8 }}>
          {addZero(i.number)}
        </li>
      );
    }
  });

  const orderNumberPending = orders.map((i) => {
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
