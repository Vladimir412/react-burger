import { useEffect, useState } from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import getData from '../../utils/dataApi';

const ingredient = 'ingredient';
const order = 'order'



function App() {

  const [dataIngredients, setDataIngredients] = useState([])
  const [stateModalIngredient, setStateModalIngredient] = useState(false);
  const [stateModalOrder, setStateModalOrder] = useState(false);
  const [typeModal, setTypeModal] = useState('')
  const [infoAboutCard, setInfoAboutCard] = useState(null)

//получаем данные ингридиентов
  useEffect(() => {
    getData()
    .then(data => setDataIngredients(data))
    .catch(err => console.log(err))
  }, [])


//открыитие попапа ингридиента и получение данных
  const openModalIngredient = (info) => {
    setStateModalIngredient(true)
    setInfoAboutCard(info);
    setTypeModal(ingredient)
  }

//открыитие попапа c заказом
  const openModalOrder = () => {
    setStateModalOrder(true)
    setTypeModal(order)
  }

//закрытие попапа
  const closeAllModal = () => {
    setStateModalIngredient(false)
    setStateModalOrder(false)
    setInfoAboutCard(null)
    setTypeModal('')
  }

  return (
    <>
    <div className={appStyles.app}>
        <AppHeader />
        <main className={appStyles.main}>
          <BurgerIngredients 
            ingredients={dataIngredients}
            openModalIngredient={openModalIngredient}
          />
          <BurgerConstructor 
            ingredients={dataIngredients}
            openModalOrder={openModalOrder}
          />
        </main>
    </div>
    {
      stateModalIngredient &&
      <Modal title="Детали ингредиента" closeModal={closeAllModal} typeModal={typeModal}>
        <IngredientDetails 
          ingredientsInfo={infoAboutCard}
        />
      </Modal>
    }
    {
      stateModalOrder &&
      <Modal closeModal={closeAllModal} typeModal={typeModal}>
        <OrderDetails />
      </Modal>
    }
    </>
  );
}

export default App;
