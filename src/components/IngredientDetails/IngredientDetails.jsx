import ingredientDetailsStyles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

const IngredientDetails = ({ withoutModal }) => {
  const history = useHistory();
  const { ingredients } = useSelector((state) => state.ingredientReducers);
  const path = useParams().ingredientId;

  const stylesConainer = withoutModal
    ? ingredientDetailsStyles.constainer_type_withoutModal
    : ingredientDetailsStyles.container;

  if (ingredients && ingredients.length > 0) {
    const { calories, carbohydrates, image_large, name, proteins, fat } =
      ingredients.find((i) => i._id === path);
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

IngredientDetails.propTypes = {
  withoutModal: PropTypes.string,
};

export default IngredientDetails;
