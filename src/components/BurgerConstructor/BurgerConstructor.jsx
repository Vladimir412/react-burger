import { useContext, useEffect, useState } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from "./BurgerConstructor.module.css";
import ItemBurgerConstructor from "../ItemBurgerConstructor/ItemBurgerConstructor";
import { typesOfOpenModalIngredient } from "../../utils/types";
import { IngredientContext } from "../../utils/IngredientContext";
import { sentDataIngredients } from "../../utils/dataApi";

const BurgerConstructor = (props) => {
  const { dataIngredients } = useContext(IngredientContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const itemBun = dataIngredients.filter((i) => i.type === "bun");
  const itemBunTop = itemBun.map((i) => {
    if (i.type === "bun") {
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
            price={20}
            thumbnail={i.image}
          />
        </li>
      );
    }
  });

  const itemBunBottom = itemBun.map((i, index) => {
    if (i.type === "bun") {
      return (
        <li
          key={index}
          id={i._id}
          className={`${
            (burgerConstructor.element, burgerConstructor.element_type_blocked)
          } mb-4`}
        >
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${i.name} (низ)`}
            price={20}
            thumbnail={i.image}
          />
        </li>
      );
    }
  });

  const arrayItem = dataIngredients.filter((i) => i.type !== "bun");
  const newArrayItem = arrayItem.map((i) => {
    return (
      <li
        key={i._id}
        id={i._id}
        className={`${burgerConstructor.element} mb-4`}
      >
        <ItemBurgerConstructor {...i} />
      </li>
    );
  });

  const handleSentData = () => {
    const data = arrayItem.map((i) => i._id);
    data.push(itemBun[0]._id);
    data.push(itemBun[0]._id);
    sentDataIngredients(data)
      .then((res) => props.setDataOrderModal(res))
      .then(() => props.openModalOrder())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let total = 0;
    newArrayItem.forEach((i) => (total += i.props.children.props.price));
    itemBun.length > 0 &&
      (total = total + itemBunTop[0].props.children.props.price * 2);
    setTotalPrice(total);
  }, [dataIngredients]);

  return (
    <section>
      <ul className={burgerConstructor.container}>
        {itemBunTop[0]}
        <div className={`${burgerConstructor.containerInside} mb-5`}>
          {newArrayItem}
        </div>
        {itemBunBottom[0]}
      </ul>
      <div className={burgerConstructor.totalPrice}>
        <div className={`${burgerConstructor.totalPrice__price}`}>
          <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleSentData}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  openModalIngredient: typesOfOpenModalIngredient,
};

export default BurgerConstructor;
