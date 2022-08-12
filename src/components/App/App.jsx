import { useEffect, useState } from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';

const urlIngredients = 'https://norma.nomoreparties.space/api/ingredients';
const buttonEscape = 'Escape';



function App() {

  const [dataIngredients, setDataIngredients] = useState([])
  const [stateModalIngredient, setStateModalIngredient] = useState(false);
  const [stateModalOrder, setStateModalOrder] = useState(false);
  const [typeModal, setTypeModal] = useState('')
  const [infoAboutCard, setInfoAboutCard] = useState(null)

  useEffect(() => {
    fetch(`${urlIngredients}`)
    .then(res => res.ok ? res.json() : Promise.reject(console.log(res)))
    .then(data => setDataIngredients(data))
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === buttonEscape) {
        closeAllModal(false)
      }
    }
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])


  const openModalIngredient = (info) => {
    setStateModalIngredient(true)
    setInfoAboutCard(info);
    setTypeModal('ingredient')
  }

  const openModalOrder = () => {
    setStateModalOrder(true)
    setTypeModal('order')
  }


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
