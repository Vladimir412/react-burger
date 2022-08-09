import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'

function App() {
  return (
    <div className="App">
        <AppHeader />
        <main className="main">
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
    </div>
  );
}

export default App;
