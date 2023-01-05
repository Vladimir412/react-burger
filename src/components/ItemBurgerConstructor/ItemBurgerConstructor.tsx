import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import itemBurgerConstructorStyles from "./ItemBurgerConstructor.module.css";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { removeIngredientInConstructor } from "../../services/actions/actions";
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from "react-dnd";
import { useRef } from "react";
import { FC } from "react";
import { IItemBurgerConstructor } from "../../utils/types/types";

const ItemBurgerConstructor: FC<IItemBurgerConstructor> = (props) => {
  const { dragId, moveItem, index } = props;

  const { ingredientsInConstructor } = useAppSelector(
    (store) => store.ingredientReducers
  );

  const dispatch = useAppDispatch();

  const ref = useRef<HTMLLIElement | null>(null);
  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item: { index: number }, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex: number = item.index;
      const hoverIndex: number = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { dragId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = (): void => {
    let item = ingredientsInConstructor.filter((i) => {
      return i.dragId !== props.dragId;
    });
    console.log(item);

    /* @ts-ignore */
    dispatch(removeIngredientInConstructor(item));
  };

  const opacity = isDragging ? 0 : 1;

  dragRef(dropRef(ref));

  return (
    <li
      className={`${itemBurgerConstructorStyles.element} mb-4`}
      style={{ opacity }}
      ref={ref}
    >
      <DragIcon type="primary" />
      <div className={itemBurgerConstructorStyles.element__info}>
        <ConstructorElement
          type={undefined}
          isLocked={false}
          text={props.name}
          price={props.price}
          thumbnail={props.image}
          handleClose={handleDelete}
        />
      </div>
    </li>
  );
};

export default ItemBurgerConstructor;
