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
import Login from "../Login/Login";
import Register from "../Register/Register";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import Profile from "../Profile/Profile";
import Orders from "../Orders/Oreders";

const ingredient = "ingredient";
const order = "order";
const withoutModal = "withoutModal";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  let background = location.state && location.state.background;

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
  const closeAllModal = () => {
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
                <BurgerIngredients openModalIngredient={openModalIngredient} />
                <BurgerConstructor openModalOrder={openModalOrder} />
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
            <Modal
              title="Детали ингредиента"
              closeModal={closeAllModal}
              typeModal={ingredient}
            >
              <IngredientDetails />
            </Modal>
          }
        />
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
