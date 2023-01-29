import ingredientDetailsStyles from "./IngredientDetails.module.css";
import { useAppSelector } from "../../utils/hooks";
import { useParams } from "react-router-dom";
import { FC } from "react";
import { TIngredientDetailsWithOut } from "../../utils/types/types";

const IngredientDetails: FC<{ withoutModal?: string }> = ({
  withoutModal,
}: TIngredientDetailsWithOut) => {
  const { ingredients } = useAppSelector((store) => store.ingredientReducers);
  const { ingredientId } = useParams<{ ingredientId: string }>();

  const stylesConainer = withoutModal
    ? ingredientDetailsStyles.constainer_type_withoutModal
    : ingredientDetailsStyles.container;

  if (ingredients && ingredients.length > 0) {
    let calories, carbohydrates, image_large, name, proteins, fat;
    const result = ingredients.find((i) => i._id === ingredientId);
    if (result !== undefined) {
      ({ calories, carbohydrates, image_large, name, proteins, fat } = result);
    }
    return (
      <div className={stylesConainer} data-cy="container-modal-ingredient">
        {withoutModal && (
          <h1 className={`text text_type_main-large`}>Детали ингредиента</h1>
        )}
        <img
          className={ingredientDetailsStyles.image}
          src={image_large}
          alt="Ингредиент"
          data-cy="src-image"
        />
        <h2
          className={`${ingredientDetailsStyles.title} text text_type_main-medium`}
          data-cy="name-ingredient"
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
            <p className="text text_type_digits-default" data-cy="calories">
              {calories}
            </p>
          </li>
          <li className={ingredientDetailsStyles.item}>
            <p
              className={`${ingredientDetailsStyles.item__title} text text_type_main-default`}
            >
              Белки, г
            </p>
            <p className="text text_type_digits-default" data-cy="proteins">
              {proteins}
            </p>
          </li>
          <li className={ingredientDetailsStyles.item}>
            <p
              className={`${ingredientDetailsStyles.item__title} text text_type_main-default`}
            >
              Жиры, г
            </p>
            <p className="text text_type_digits-default" data-cy="fat">{fat}</p>
          </li>
          <li className={ingredientDetailsStyles.item}>
            <p
              className={`${ingredientDetailsStyles.item__title} text text_type_main-default`}
            >
              Углеводы, г
            </p>
            <p className="text text_type_digits-default" data-cy="carbohydrates">{carbohydrates}</p>
          </li>
        </ul>
      </div>
    );
  } else {
    return <p style={{ color: "white" }}>Waiting...</p>;
  }
};

export default IngredientDetails;
