import React, { useEffect, useState } from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import * as dataApi from '../Api/dataApi';

const url = 'https://norma.nomoreparties.space/api/ingredients';


function App() {

  const [dataIngredients, setDataIngredients] = useState([])

  useEffect(() => {
    fetch(`${url}`)
    .then(res => res.ok ? res.json() : Promise.reject(console.log(res)))
    .then(data => setDataIngredients(data))
    .catch(err => console.log(err))
  }, [])

  console.log(dataIngredients);

  return (
    <div className={appStyles.app}>
        <AppHeader />
        <main className={appStyles.main}>
          <BurgerIngredients 
            ingredients={dataIngredients}
          />
          <BurgerConstructor />
        </main>
    </div>
  );
}

export default App;
