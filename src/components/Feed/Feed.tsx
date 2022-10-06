import { FC } from "react";
import feedStyles from "./Feed.module.css";
import FeedItem from "../FeedItem/FeedItem";
import FeedItemComplete from "../FeedItemComplete/FeedItemComplete";
import FeedItemOrderBoard from "../FeedItemOrderBoard/FeedItemOrderBoard";
import { completeAllTime, completeToday } from "../../utils/constans";

const Feed: FC = () => {

  const item = <li>
  <FeedItem
    id={"#034535"}
    time={"Сегодня, 16:20 i-GMT+3"}
    title={"Death Star Starship Main бургер"}
    price={480}
    images={["https://code.s3.yandex.net/react/code/bun-01-mobile.png", 
    "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "https://code.s3.yandex.net/react/code/core-mobile.png"]}
    key={'0654645'}
  /></li>


  return (
    <section>
      <h1 className={feedStyles.title}>Лента заказов</h1>
      <div className={feedStyles.container}>
        <div className={feedStyles.containerOrder}>
          <ul className={feedStyles.containerOrder__lists}>{item}</ul>
        </div>
        <div className={feedStyles.containerInfo}>
          <div className={feedStyles.containerInfo__lists}>
            <FeedItemOrderBoard title={"Готовы:"} children={<li></li>} />
            <FeedItemOrderBoard title={"В работе:"} children={<li></li>} />
          </div>
          <FeedItemComplete title={completeAllTime} quantity={28752} />

          <FeedItemComplete title={completeToday} quantity={138} />
        </div>
      </div>
    </section>
  );
};

export default Feed;
