import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cardIngredientStyles from "./CardIngredient.module.css";
import { useLocation, Link } from 'react-router-dom'
import { typesOfIngredients, typesOfOpenModalIngredient } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { addDataModalIngredient, modalIngredientItemOpen } from "../../services/actions/actions";
import { useDrag } from "react-dnd";
import { useEffect, useState } from "react";

const CardIngredient = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { ingredientsInConstructor } = useSelector(
    (state) => state.ingredientReducers
  );
  const [quntity, setQuantity] = useState(0);
  const ingredientId = props.id;

  const [, dragRef] = useDrag({
    type: props.type === "bun" ? "bun" : "ingredient",
    item: props,
  });

  const countQuantity = () => {
    let total = 0;
    ingredientsInConstructor &&
      ingredientsInConstructor.forEach((i) => {
        if (i._id === props._id) total += 1;
        if (i._id === props._id && i.type === "bun") total += 1;
      });

    setQuantity(total);
  };
  useEffect(() => {
    countQuantity();
  }, [ingredientsInConstructor]);

  const onHandleClick = () => {
    dispatch(addDataModalIngredient(props));
    props.openModalIngredient();
    dispatch(modalIngredientItemOpen(true))
  };

  return (
    <Link to={{ pathname: `/ingredients/${ingredientId}`, state: { background: location } }}>
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
    </Link>
  );
};

CardIngredient.propTypes = {
  openModalIngredient: typesOfOpenModalIngredient
};

export default CardIngredient;
