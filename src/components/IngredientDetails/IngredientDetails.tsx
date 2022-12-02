import ingredientDetailsStyles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "../../utils/hooks";
import { useParams, useHistory } from "react-router-dom";
import { FC } from "react";
import {
  TIngredientDetailsWithOut,
  TIngredient,
  TDetailIngredient,
} from "../../utils/types/types";

const IngredientDetails: FC<{ withoutModal?: string }> = ({
  withoutModal,
}: TIngredientDetailsWithOut) => {
  const history = useHistory();
  // const { ingredients } = useAppSelector((state) => state.ingredientReducers);
  const { ingredients } = useSelector((state: any) => state.ingredientReducers);
  const { ingredientId } = useParams<{ ingredientId: string }>();

  const stylesConainer = withoutModal
    ? ingredientDetailsStyles.constainer_type_withoutModal
    : ingredientDetailsStyles.container;

  if (ingredients && ingredients.length > 0) {
    const { calories, carbohydrates, image_large, name, proteins, fat } =
      ingredients.find((i: any) => i._id === ingredientId);
    return (
      <div className={stylesConainer}>
        {withoutModal && (
          <h1 className={`text text_type_main-large`}>Детали ингредиента</h1>
        )}
        <img
          className={ingredientDetailsStyles.image}
          src={image_large}
          alt="Ингредиент"
        />
        <h2
          className={`${ingredientDetailsStyles.title} text text_type_main-medium`}
        >
          {name}
        </h2>
        <ul className={ingredientDetailsStyles.list}>
          <li className={ingredientDetailsStyles.item}>
            <p
              className={`${ingredientDetailsStyles.item__title} text text_type_main-default`}
            >
              Калории,ккал
            </p>
            <p className="text text_type_digits-default">{calories}</p>
          </li>
          <li className={ingredientDetailsStyles.item}>
            <p
              className={`${ingredientDetailsStyles.item__title} text text_type_main-default`}
            >
              Белки, г
            </p>
            <p className="text text_type_digits-default">{proteins}</p>
          </li>
          <li className={ingredientDetailsStyles.item}>
            <p
              className={`${ingredientDetailsStyles.item__title} text text_type_main-default`}
            >
              Жиры, г
            </p>
            <p className="text text_type_digits-default">{fat}</p>
          </li>
          <li className={ingredientDetailsStyles.item}>
            <p
              className={`${ingredientDetailsStyles.item__title} text text_type_main-default`}
            >
              Углеводы, г
            </p>
            <p className="text text_type_digits-default">{carbohydrates}</p>
          </li>
        </ul>
      </div>
    );
  } else {
    return <p style={{ color: "white" }}>Waiting...</p>;
  }
};

export default IngredientDetails;
