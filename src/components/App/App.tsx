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
import Orders from "../Orders/Oreders";
<<<<<<< HEAD:src/components/App/App.tsx
import { withoutModal } from '../../utils/constans'
import {Location} from "history";

=======
import { withoutModal } from '../../utils/constans';

const ingredient = "ingredient";
const order = "order";
// const withoutModal = "withoutModal";
>>>>>>> 24a5e8cb3b0ace043111cbc19d9c22fc2835b18a:src/components/App/App.jsx

function App() {
  
  const dispatch = useDispatch<any>();
  const history = useHistory();
  const location = useLocation<{background?: Location<{} | null | undefined>}>();
  const background = location?.state && location?.state?.background;

  //получаем данные ингридиентов
  useEffect(() => {    
    dispatch(getDataIngredients());
  }, []);

  const { isLogged, accessToken } = useSelector((state: any) => state.authReducer);
  const refreshToken: string | null = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (isLogged) {
      /* @ts-ignore */
      dispatch(getInfoAboutUser(accessToken));
    } else if (!isLogged && refreshToken) {
      /* @ts-ignore */
      dispatch(autoLogin());
    }
  }, [isLogged]);

  //закрытие попапа
  const closeModal = (): void => {
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
            <Modal closeModal={closeModal} title="">
              <OrderDetails />
            </Modal>
          }
        />
      )}
    </>
  );
}

export default App;
