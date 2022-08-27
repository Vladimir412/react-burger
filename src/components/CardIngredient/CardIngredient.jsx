import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cardIngredientStyles from "./CardIngredient.module.css";
import { typesOfIngredients } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { addDataModalIngredient } from "../../services/actions/actions";
import { useDrag } from "react-dnd";
import { useEffect, useState } from "react";

const CardIngredient = (props) => {
  const dispatch = useDispatch();
  const { ingredientsInConstructor } = useSelector(
    (state) => state.ingredientReducers
  );
  const [quntity, setQuantity] = useState(0);

  const [, dragRef] = useDrag({
    type: props.type === "bun" ? "bun" : "ingredient",
    item: props,
  });

  const countQuantity = () => {
    let total = 0;
    ingredientsInConstructor &&
      ingredientsInConstructor.forEach((i) => {
        if (i._id === props._id) total += 1;
      });
    setQuantity(total);
  };
  useEffect(() => {
    countQuantity();
  }, [ingredientsInConstructor]);

  const onHandleClick = () => {
    dispatch(addDataModalIngredient(props));
    props.openModalIngredient();
  };

  return (
    <article
      className={`${cardIngredientStyles.product__container}`}
      onClick={onHandleClick}
      ref={dragRef}
    >
      {quntity > 0 && <Counter count={quntity} size="default" />}
      <img
        className={cardIngredientStyles.image}
        src={props.image}
        alt="Продукт"
      />
      <div className={cardIngredientStyles.price}>
        <p className="mr-2">{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h2
        className={`${cardIngredientStyles.title} text text_type_main-default`}
      >
        {props.name}
      </h2>
    </article>
  );
};

CardIngredient.propTypes = typesOfIngredients;

export default CardIngredient;
