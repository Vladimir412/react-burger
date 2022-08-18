import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import itemBurgerConstructorStyles from "./ItemBurgerConstructor.module.css";
import { typesOfIngredients } from "../../utils/types";

const ItemBurgerConstructor = (props) => {
  return (
    <>
      <DragIcon type="primary" />
      <div className={itemBurgerConstructorStyles.element__info}>
        <ConstructorElement
          type={undefined}
          isLocked={false}
          text={props.name}
          price={props.price}
          thumbnail={props.image}
        />
      </div>
    </>
  );
};

ItemBurgerConstructor.propTypes = typesOfIngredients;

export default ItemBurgerConstructor;
