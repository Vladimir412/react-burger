import { useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import CardIngredient from "../CardIngredient/CardIngredient";
import { typesOfOpenModalIngredient } from "../../utils/types";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

const BurgerIngredients = (props) => {
  const { ingredients } = useSelector((state) => state.ingredientReducers);

  const [bunTab, setBunTab] = useState(true);
  const [sauceTab, setSauceTab] = useState(false);
  const [mainTab, setMainTab] = useState(false);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const navRef = useRef(null);

  const [bunViewRef, bunViewInView] = useInView({
    initialInView: true,
  });
  const [sauceViewRef, sauceViewInView] = useInView({});
  const [mainViewRef, mainViewInView] = useInView({});

  const scrollIngredients = (value) => {
    value.current.scrollIntoView({ behavior: "smooth" });
  };

  const changeItem = (e) => {
    if (e === "bun") {
      setBunTab(true);
      setSauceTab(false);
      setMainTab(false);
      scrollIngredients(bunRef);
    }
    if (e === "sauce") {
      setBunTab(false);
      setSauceTab(true);
      setMainTab(false);
      scrollIngredients(sauceRef);
    }
    if (e === "main") {
      setBunTab(false);
      setSauceTab(false);
      setMainTab(true);
      scrollIngredients(mainRef);
    }
  };

  const newData = ingredients
    ? ingredients.map((i) => (
        <CardIngredient
          key={i._id}
          id={i._id}
          {...i}
          openModalIngredient={props.openModalIngredient}
        />
      ))
    : null;

  const bun = newData !== null && newData.filter((i) => i.props.type === "bun");
  const sauce =
    newData !== null && newData.filter((i) => i.props.type === "sauce");
  const main =
    newData !== null && newData.filter((i) => i.props.type === "main");

  return (
    <section className={burgerIngredientsStyles.container}>
      <h1
        className={`text text_type_main-large ${burgerIngredientsStyles.title}`}
      >
        Соберите бургер
      </h1>
      <nav className={burgerIngredientsStyles.nav__container} ref={navRef}>
        <a>
          <Tab value="bun" active={bunViewInView} onClick={changeItem}>
            Булки
          </Tab>
        </a>
        <a>
          <Tab
            value="sauce"
            active={!bunViewInView && sauceViewInView}
            onClick={changeItem}
          >
            Соусы
          </Tab>
        </a>
        <a>
          <Tab
            value="main"
            active={!bunViewInView && !sauceViewInView && mainViewInView}
            onClick={changeItem}
          >
            Начинки
          </Tab>
        </a>
      </nav>
      <div className={burgerIngredientsStyles.ingredients}>
        <h2
          id="bun"
          className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mt-5`}
          ref={bunRef}
        >
          Булки
        </h2>
        <div ref={bunViewRef} className={burgerIngredientsStyles.ingredient}>
          {bun}
        </div>
        <h2
          id="sauce"
          className={`${burgerIngredientsStyles.ingredients__title_type_exactFirst} text text_type_main-medium mt-5`}
          ref={sauceRef}
        >
          Соусы
        </h2>
        <div ref={sauceViewRef} className={burgerIngredientsStyles.ingredient}>
          {sauce}
        </div>
        <h2
          id="main"
          className={`${burgerIngredientsStyles.ingredients__title_type_exactFirst} text text_type_main-medium mt-5`}
          ref={mainRef}
        >
          Начинки
        </h2>
        <div ref={mainViewRef} className={burgerIngredientsStyles.ingredient}>
          {main}
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  openModalIngredient: typesOfOpenModalIngredient,
};

export default BurgerIngredients;
