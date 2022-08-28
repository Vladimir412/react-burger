import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import itemBurgerConstructorStyles from "./ItemBurgerConstructor.module.css";
import { typesOfIngredients } from "../../utils/types";
import { useSelector, useDispatch } from "react-redux";
import { removeIngredientInConstructor } from "../../services/actions/actions";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import PropTypes from 'prop-types';


const ItemBurgerConstructor = (props) => {
  const { dragId, moveItem, index } = props;

  const { ingredientsInConstructor } = useSelector(
    (state) => state.ingredientReducers
  );

  const dispatch = useDispatch();

  const ref = useRef(null);
  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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

  const handleDelete = () => {
    let item = ingredientsInConstructor.filter((i) => {
      return i.dragId !== props.dragId;
    });
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

ItemBurgerConstructor.propTypes = {
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired,
  dragId: PropTypes.string.isRequired
};

export default ItemBurgerConstructor;
