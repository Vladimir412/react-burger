import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
// import { getData } from "../../utils/dataApi";
// import { getIngredients } from "../../services/actions/actions";
import {
  getDataIngredients,
  modalOrderItemClosed,
} from "../../services/actions/actions";
import { removeDataModalIngredient } from "../../services/actions/actions";

const ingredient = "ingredient";
const order = "order";

function App() {
  const dispatch = useDispatch();

  const [typeModal, setTypeModal] = useState("");
  const { isModalOrder, isModalIngredient } = useSelector(
    (state) => state.ingredientReducers
  );

  //получаем данные ингридиентов
  useEffect(() => {
    dispatch(getDataIngredients());
  }, []);

  //открыитие попапа ингридиента и получение данных
  const openModalIngredient = () => {
    setTypeModal(ingredient);
  };

  //открыитие попапа c заказом
  const openModalOrder = () => {
    setTypeModal(order);
  };

  //закрытие попапа
  const closeAllModal = () => {
    // dispatch(modalOrderItemClosed)
    dispatch(removeDataModalIngredient({}));
    setTypeModal("");
  };

  return (
    <>
      <div className={appStyles.app}>
        <AppHeader />
        <main className={appStyles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients openModalIngredient={openModalIngredient} />
            <BurgerConstructor openModalOrder={openModalOrder} />
          </DndProvider>
        </main>
      </div>
      {isModalIngredient && (
        <Modal
          title="Детали ингредиента"
          closeModal={closeAllModal}
          typeModal={typeModal}
        >
          <IngredientDetails />
        </Modal>
      )}
      {isModalOrder && (
        <Modal closeModal={closeAllModal} title="" typeModal={typeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
