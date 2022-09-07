import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getDataIngredients } from "../../services/actions/actions";
import { getInfoAboutUser } from "../../services/actions/userInfo";
import { removeDataModalIngredient } from "../../services/actions/actions";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import Profile from "../Profile/Profile";

const ingredient = "ingredient";
const order = "order";

function App() {
  const dispatch = useDispatch();

  const [typeModal, setTypeModal] = useState("");
  const { isModalOrder, isModalIngredient } = useSelector(
    (state) => state.ingredientReducers
  );
  const { isLogged, accessToken } = useSelector(state => state.authReducer)
  const refreshToken = localStorage.getItem('refreshToken')

  useEffect(() => {
    if (isLogged) {
      dispatch(getInfoAboutUser(accessToken))
    }
  }, [isLogged]);

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
        <Switch>
          <ProtectedRoute path="/" exact>
            <main className={appStyles.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients openModalIngredient={openModalIngredient} />
                <BurgerConstructor openModalOrder={openModalOrder} />
              </DndProvider>
            </main>
          </ProtectedRoute>
          <Route path="/login" >
            <Login />
          </Route>
          <Route path="/register" >
            <Register />
          </Route>
          <Route path="/forgot-password" >
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" >
            <ResetPassword />
          </Route>
          <ProtectedRoute path="/profile" exact>
            <Profile />
          </ProtectedRoute>
        </Switch>
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
