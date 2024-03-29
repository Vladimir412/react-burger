import { useEffect, useState, FC } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./BurgerConstructor.module.css";
import { TIngredientDetails } from "../../utils/types/types";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { sentDataOrder } from "../../services/actions/actions";
import { useHistory, useLocation } from "react-router-dom";
import { useDrop } from "react-dnd";
import { addIngredientInConstructor } from "../../services/actions/actions";
import { v4 as uuidv4 } from "uuid";
import ListItemBurgerConstructor from "../ListItemBurgerConstructor/ListItemBurgerConstructor";

const BurgerConstructor: FC = () => {
  const { ingredientsInConstructor, isLoading } = useAppSelector(
    (state) => state.ingredientReducers
  );
  const { isLogged, accessToken } = useAppSelector(
    (store) => store.authReducer
  );
  const history = useHistory();
  const location = useLocation<string>();
  const dispatch = useAppDispatch();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [, dropBunRef] = useDrop({
    accept: "bun",
    drop(data: TIngredientDetails) {
      handleDrop(data);
    },
  });

  const handleDrop = (data: TIngredientDetails): void => {
    if (ingredientsInConstructor && ingredientsInConstructor.length > 0) {
      {/* @ts-ignore */}
      dispatch(addIngredientInConstructor([...ingredientsInConstructor,{ ...data, dragId: uuidv4() },])
      );
    } else {
      {
        /* @ts-ignore */
      }
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
      {/* @ts-ignore */}
      dispatch(addIngredientInConstructor([...arrIngr, lastBun]));
    }
  }, [itemBun]);

  const openModalOrder = (orderId: string): void => {
    history.push({
      pathname: `/orders/${orderId}`,
      state: { background: location },
    });
  };

  const handleSentData = (): void => {
    if (!isLogged) {
      history.push("/login");
    } else {
      const data = ingredientsInConstructor.map((i) => i._id);
      data.push(itemBun[0]._id);
      {/* @ts-ignore */}
      dispatch(sentDataOrder(data, accessToken, openModalOrder));
    }
  };

  const findItemBun = ingredientsInConstructor.some((i) => i.type === "bun");

  const stateButton =
    ingredientsInConstructor.length >= 2 && findItemBun === true ? false : true;

  return (
    <section>
      <ul className={burgerConstructor.container}>
        <div
          id="top-bun"
          className={burgerConstructor.containerOutside}
          ref={dropBunRef}
        >
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
          htmlType={"button"}
        >
          {isLoading ? "Оформляем заказ..." : "Оформить заказ"}
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
