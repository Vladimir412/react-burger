import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cardIngredientStyles from "./CardIngredient.module.css";
import { useLocation, Link } from "react-router-dom";
import {
  TCardIngredient,
  TIngredient,
} from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useEffect, useState, FunctionComponent } from "react";

    const CardIngredient: FunctionComponent<TCardIngredient> = ({ calories, carbohydrates, fat, price, proteins, image, image_large, name, type, id, _id, key }) => {
// const CardIngredient: FunctionComponent<TCardIngredient> = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { ingredientsInConstructor } = useSelector(
    (state: any) => state.ingredientReducers
  );
  const [quntity, setQuantity] = useState(0);
  const ingredientId = id;
  // const ingredientId = props.id;

  const [, dragRef] = useDrag({
    type: type === "bun" ? "bun" : "ingredient",
    // type: props.type === "bun" ? "bun" : "ingredient",
    item: {calories, carbohydrates, fat, proteins, image, image_large, name, type, id, _id, key}
    // item: props,
  });

  const countQuantity = () => {
    let total = 0;
    ingredientsInConstructor &&
      ingredientsInConstructor.forEach((i: TCardIngredient) => {
        if (i._id === _id) total += 1;
        // if (i._id === props._id) total += 1;
        if (i._id === _id && i.type === "bun") total += 1;
        // if (i._id === props._id && i.type === "bun") total += 1;
      });

    setQuantity(total);
  };
  useEffect(() => {
    countQuantity();
  }, [ingredientsInConstructor]);

  return (
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      style={{ textDecoration: "none", color: "#F2F2F3" }}
    >
      <article
        className={`${cardIngredientStyles.product__container}`}
        ref={dragRef}
      >
        {quntity > 0 && <Counter count={quntity} size="default" />}
        <img
          className={cardIngredientStyles.image}
          src={image}
          // src={props.image}
          alt="Продукт"
        />
        <div className={cardIngredientStyles.price}>
          <p className="mr-2">{price}</p>
          {/* <p className="mr-2">{props.price}</p> */}
          <CurrencyIcon type="primary" />
        </div>
        <h2
          className={`${cardIngredientStyles.title} text text_type_main-default`}
        >
          {name}
          {/* {props.name} */}
        </h2>
      </article>
    </Link>
  );
};

export default CardIngredient;
