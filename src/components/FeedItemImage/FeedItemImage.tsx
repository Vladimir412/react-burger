import feedItemImageStyles from './FeedItemImage.module.css'
import { FC } from 'react'

const FeedItemImage: FC<any> = (props) => {
// console.log(props);


  return (
    <div className={feedItemImageStyles.gradient}>
      <img className={feedItemImageStyles.image} src={props.src} alt="Ингредиент" />
    </div>
  );
};

export default FeedItemImage