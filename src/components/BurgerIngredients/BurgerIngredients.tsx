import { useRef, useState, FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from "./BurgerIngredients.module.css";
import CardIngredient from "../CardIngredient/CardIngredient";
import { useAppSelector } from "../../utils/hooks";
import { useInView } from "react-intersection-observer";

const BurgerIngredients: FC = () => {
  const { ingredients } = useAppSelector((store) => store.ingredientReducers);
  

  const [bunTab, setBunTab] = useState<boolean>(true);
  const [sauceTab, setSauceTab] = useState<boolean>(false);
  const [mainTab, setMainTab] = useState<boolean>(false);
  const bunRef = useRef<null | HTMLHeadingElement>(null);
  const sauceRef = useRef<null | HTMLHeadingElement>(null);
  const mainRef = useRef<null | HTMLHeadingElement>(null);
  const navRef = useRef<null | HTMLHeadingElement>(null);

  const [bunViewRef, bunViewInView] = useInView({
    initialInView: true,
  });
  const [sauceViewRef, sauceViewInView] = useInView({});
  const [mainViewRef, mainViewInView] = useInView({});
  
  const scrollIngredients = (value: {current: any}) => {    
    value.current.scrollIntoView({ behavior: "smooth" });
  };

  const changeItem = (e: string) => {
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

export default BurgerIngredients;
