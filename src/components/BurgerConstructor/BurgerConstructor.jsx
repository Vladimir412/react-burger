import { useEffect, useState } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./BurgerConstructor.module.css";
import { typesOfOpenModalOrder } from "../../utils/types";
import { useSelector, useDispatch } from "react-redux";
import { sentDataOrder } from "../../services/actions/actions";
import { useHistory } from "react-router-dom";
import { useDrop } from "react-dnd";
import { addIngredientInConstructor } from "../../services/actions/actions";
import { v4 as uuidv4 } from "uuid";
import ListItemBurgerConstructor from "../ListItemBurgerConstructor/ListItemBurgerConstructor";

const BurgerConstructor = (props) => {
  const { ingredientsInConstructor, isLoading } = useSelector(
    (state) => state.ingredientReducers
  );
  const { isLogged, accessToken } = useSelector((state) => state.authReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const [, dropBunRef] = useDrop({
    accept: "bun",
    drop(data) {
      handleDrop(data);
    },
  });

  const handleDrop = (data) => {
    if (ingredientsInConstructor && ingredientsInConstructor.length > 0) {
      dispatch(
        addIngredientInConstructor([
          ...ingredientsInConstructor,
          { ...data, dragId: uuidv4() },
        ])
      );
    } else {
      dispatch(addIngredientInConstructor([{ ...data, dragId: uuidv4() }]));
    }
  };

  const itemBun =
    ingredientsInConstructor &&
    ingredientsInConstructor.filter((i) => i.type === "bun");
  const itemBunTop =
    itemBun &&
    itemBun.map((i) => {
      return (
        <li
          key={i._id}
          id={i._id}
          className={`${
            (burgerConstructor.element, burgerConstructor.element_type_blocked)
          } mb-4`}
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${i.name} (верх)`}
            price={i.price}
            thumbnail={i.image}
          />
        </li>
      );
    });

  const itemBunBottom =
    itemBun &&
    itemBun.map((i) => {
      return (
        <li
          key={i.dragId}
          id={i._id}
          className={`${
            (burgerConstructor.element, burgerConstructor.element_type_blocked)
          } mb-4`}
        >
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${i.name} (низ)`}
            price={i.price}
            thumbnail={i.image}
          />
        </li>
      );
    });

  useEffect(() => {
    let total = 0;
    ingredientsInConstructor &&
      ingredientsInConstructor.forEach((item) => {
        total += item.price;
      });
    if (itemBun && itemBun.length > 0) total += itemBun[0].price;
    setTotalPrice(total);
  }, [ingredientsInConstructor]);

  useEffect(() => {
    if (itemBun.length > 1) {
      const lastBun = itemBun[itemBun.length - 1];
      const arrIngr = ingredientsInConstructor.filter((i) => i.type !== "bun");
      dispatch(addIngredientInConstructor([...arrIngr, lastBun]));
    }
  }, [itemBun]);

  const handleSentData = () => {
    if (!isLogged) {
      history.push("/login");
    } else {
      props.openModalOrder();
      const data = ingredientsInConstructor.map((i) => i._id);
      data.push(itemBun[0]._id);
      dispatch(sentDataOrder(data, accessToken));
    }
  };

  const findItemBun = ingredientsInConstructor.some((i) => i.type === "bun");

  const stateButton =
    ingredientsInConstructor.length >= 2 && findItemBun === true ? false : true;

  return (
    <section>
      <ul className={burgerConstructor.container}>
        <div className={burgerConstructor.containerOutside} ref={dropBunRef}>
          {itemBunTop}
        </div>
        <ListItemBurgerConstructor />
        <div className={`${burgerConstructor.containerOutside} mt-3`}>
          {itemBunBottom}
        </div>
      </ul>
      <div className={burgerConstructor.totalPrice}>
        <div className={`${burgerConstructor.totalPrice__price}`}>
          <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={handleSentData}
          disabled={stateButton}
        >
          {isLoading ? "Оформляем заказ..." : "Оформить заказ"}
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  openModalOrder: typesOfOpenModalOrder,
};

export default BurgerConstructor;
