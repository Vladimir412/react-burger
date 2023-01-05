import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cardIngredientStyles from "./CardIngredient.module.css";
import { useLocation, Link } from "react-router-dom";
import { TCardIngredient } from "../../utils/types/types";
import { useAppSelector } from "../../utils/hooks";
import { useDrag } from "react-dnd";
import { useEffect, useState, FunctionComponent } from "react";

const CardIngredient: FunctionComponent<TCardIngredient> = ({
  calories,
  carbohydrates,
  fat,
  price,
  proteins,
  image,
  image_large,
  name,
  type,
  id,
  _id,
}) => {
  const location = useLocation<string>();
  const { ingredientsInConstructor } = useAppSelector(
    (state) => state.ingredientReducers
  );
  const [quntity, setQuantity] = useState<number>(0);
  const ingredientId: string = id;

  const [, dragRef] = useDrag({
    type: type === "bun" ? "bun" : "ingredient",
    item: {
      calories,
      carbohydrates,
      fat,
      price,
      proteins,
      image,
      image_large,
      name,
      type,
      id,
      _id,
    },
  });

  const countQuantity = (): void => {
    let total: number = 0;
    ingredientsInConstructor &&
      ingredientsInConstructor.forEach((i) => {
        if (i._id === _id) total += 1;
        if (i._id === _id && i.type === "bun") total += 1;
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
        <img className={cardIngredientStyles.image} src={image} alt="Продукт" />
        <div className={cardIngredientStyles.price}>
          <p className="mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h2
          className={`${cardIngredientStyles.title} text text_type_main-default`}
        >
          {name}
        </h2>
      </article>
    </Link>
  );
};

export default CardIngredient;
