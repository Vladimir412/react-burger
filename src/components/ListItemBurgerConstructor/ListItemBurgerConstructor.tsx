import ItemBurgerConstructor from "../ItemBurgerConstructor/ItemBurgerConstructor";
import listItemBurgerConstructorStyles from "./ListItemBurgerConstructor.module.css";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { addIngredientInConstructor } from "../../services/actions/actions";
import { v4 as uuidv4 } from "uuid";
import { useDrop } from "react-dnd";
import { useState, useEffect, FC } from "react";
import { TIngredient, IItemBurgerConstructor } from "../../utils/types/types";

const ListItemBurgerConstructor: FC = () => {
  const { ingredientsInConstructor } = useAppSelector(
    (store) => store.ingredientReducers
  );
  const dispatch = useAppDispatch();
  const [ingredients, setIngredients] = useState<Array<IItemBurgerConstructor>>(
    []
  );
  useEffect(() => {
    const arrWithoutBun: Array<IItemBurgerConstructor> =
      ingredientsInConstructor.filter((i) => {
        return i.type !== "bun";
      });
    setIngredients(arrWithoutBun);
  }, [ingredientsInConstructor]);

  const [, dropIngredientRef] = useDrop({
    accept: "ingredient",
    drop(data: TIngredient) {
      handleDrop(data);
    },
  });

  const handleDrop = (data: TIngredient): void => {
    if (ingredientsInConstructor && ingredientsInConstructor.length > 0) {
      {/* @ts-ignore */}
      dispatch(addIngredientInConstructor([...ingredientsInConstructor,{ ...data, dragId: uuidv4() },])
      );
    } else {
      {/* @ts-ignore */}
      dispatch(addIngredientInConstructor([{ ...data, dragId: uuidv4() }]));
    }
  };

  const moveItem = (dragIndex: number, hoverIndex: number): void => {
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    setIngredients(newCards);
  };

  const cards =
    ingredients &&
    ingredients.map((i, index: number) => {
      if (i.type !== "bun") {
        return (
          <ItemBurgerConstructor
            {...i}
            index={index}
            moveItem={moveItem}
            key={i.dragId}
            id={i._id}
          />
        );
      }
    });

  return (
    <div
      className={listItemBurgerConstructorStyles.containerInside}
      ref={dropIngredientRef}
    >
      {cards}
    </div>
  );
};

export default ListItemBurgerConstructor;
