import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
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
import Feed from "../../pages/Feed/Feed";
import OrderInformation from '../OrderInformation/OrderInformation';
import { withoutModal } from '../../utils/constans'
import {Location} from "history";


function App() {
  
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<{background?: Location<{} | null | undefined>}>();
  const background = location?.state && location?.state?.background;

  //получаем данные ингридиентов
  useEffect(() => {    
    dispatch(getDataIngredients());
  }, []);

  const { isLogged, accessToken } = useAppSelector((state) => state.authReducer);
  const refreshToken: string | null = localStorage.getItem("refreshToken");
  

  useEffect(() => {
    if (isLogged) {
      dispatch(getInfoAboutUser(accessToken));
    } else if (!isLogged && refreshToken) {
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
          <Route path="/feed" exact>
            <Feed />
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
          {location && (
             <Route
             path="/feed/:id"
             exact
             children={<OrderInformation withoutModal={withoutModal} />}
           />
          )}
          {location && (
            <ProtectedRoute 
              path="/profile/orders/:id"
              exact
              children={<OrderInformation withoutModal={withoutModal} />}
            />
          )}
        </Switch>
      </div>
      {background && (
        <ProtectedRoute 
          path="/profile/orders/:id"
          exact
          children={
            <Modal closeModal={closeModal} stateHeader={false}>
              <OrderInformation />
            </Modal>
          }
        />
      )}
      
      {background && (
        <Route
          path="/ingredients/:ingredientId"
          children={
            <Modal title="Детали ингредиента" closeModal={closeModal} stateHeader={true}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
      {background && (
        <Route
          path="/orders/:orderId"
          children={
            <Modal closeModal={closeModal} title="" stateHeader={true}>
              <OrderDetails />
            </Modal>
          }
        />
      )}
      {background && (
        <Route
          // path="/feed/:order"
          path="/feed/:id"
          children={
            <Modal closeModal={closeModal} stateHeader={false}>
              <OrderInformation />
            </Modal>
          }
        />
      )}
    </>
  );
}

export default App;
