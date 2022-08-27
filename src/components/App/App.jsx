import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getData } from "../../utils/dataApi";
import { getIngredients } from "../../services/actions/actions";
import { removeDataModalIngredient } from "../../services/actions/actions";

const ingredient = "ingredient";
const order = "order";

function App() {
  const dispatch = useDispatch();
  const [stateModalIngredient, setStateModalIngredient] = useState(false);
  const [stateModalOrder, setStateModalOrder] = useState(false);
  const [typeModal, setTypeModal] = useState("");

  //получаем данные ингридиентов
  useEffect(() => {
    getData()
      .then((data) => {
        dispatch(getIngredients(data));
      })
      .catch((err) => console.log(err));
  }, []);

  //открыитие попапа ингридиента и получение данных
  const openModalIngredient = () => {
    setStateModalIngredient(true);
    setTypeModal(ingredient);
  };

  //открыитие попапа c заказом
  const openModalOrder = () => {
    setStateModalOrder(true);
    setTypeModal(order);
  };

  //закрытие попапа
  const closeAllModal = () => {
    setStateModalIngredient(false);
    setStateModalOrder(false);
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
      {stateModalIngredient && (
        <Modal
          title="Детали ингредиента"
          closeModal={closeAllModal}
          typeModal={typeModal}
        >
          <IngredientDetails />
        </Modal>
      )}
      {stateModalOrder && (
        <Modal closeModal={closeAllModal} typeModal={typeModal}>
          <OrderDetails closeModal={closeAllModal} />
        </Modal>
      )}
    </>
  );
}

export default App;
