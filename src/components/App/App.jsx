import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import ProtectedRoute from "../../pages/ProtectedRoute/ProtectedRoute";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import { getDataIngredients } from "../../services/actions/actions";
import { getInfoAboutUser } from "../../services/actions/userInfo";
import { autoLogin } from "../../services/actions/auth";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../Profile/Profile";
import Orders from "../Orders/Oreders.tsx";

const ingredient = "ingredient";
const order = "order";
const withoutModal = "withoutModal";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  //получаем данные ингридиентов
  useEffect(() => {
    dispatch(getDataIngredients());
  }, []);

  const [typeModal, setTypeModal] = useState("");
  const { isModalOrder, isModalIngredient, ingredients } = useSelector(
    (state) => state.ingredientReducers
  );
  const { isLogged, accessToken } = useSelector((state) => state.authReducer);
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (isLogged) {
      dispatch(getInfoAboutUser(accessToken));
    } else if (!isLogged && refreshToken) {
      dispatch(autoLogin());
    }
  }, [isLogged]);

  //открыитие попапа ингридиента и получение данных
  const openModalIngredient = () => {
    setTypeModal(ingredient);
  };

  //открыитие попапа c заказом
  const openModalOrder = () => {
    setTypeModal(order);
  };

  //закрытие попапа
  const closeModal = () => {
    history.goBack();
  };

  return (
    <>
      <div className={appStyles.app}>
        <AppHeader />
        <Switch location={background || location}>
          <Route path="/" exact>
            <main className={appStyles.main}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor
                //  openModalOrder={openModalOrder} 
                 />
              </DndProvider>
            </main>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <ProtectedRoute path="/profile" exact>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact>
            <Orders />
          </ProtectedRoute>
          {location && (
            <Route
              path="/ingredients/:ingredientId"
              exact
              children={<IngredientDetails withoutModal={withoutModal} />}
            />
          )}
        </Switch>
      </div>
      {background && (
        <Route
          path="/ingredients/:ingredientId"
          children={
            <Modal title="Детали ингредиента" closeModal={closeModal}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
      {background && (
        <Route
          path="/orders/:orderId"
          children={
            <Modal onCloseModal={closeModal} title="">
              <OrderDetails />
            </Modal>
          }
        />
      )}
    </>
  );
}

export default App;
