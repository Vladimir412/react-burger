import { ConstructorElement, CurrencyIcon, Button  } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import ItemBurgerConstructor from "../ItemBurgerConstructor/ItemBurgerConstructor";
import { typesOfIngredients, typesOfOpenModalIngredient } from '../../utils/types'




const BurgerConstructor = (props) => {

    const array = props.ingredients

    const arrayItem = array ? array.map(i => {
        return (
            <li key={i._id} id={i._id} className={`${burgerConstructor.element} mb-4`}>
                <ItemBurgerConstructor {...i}/>
            </li>
        )
    }) : null

   return (
    <section>
        <ul className={burgerConstructor.container}>
            <li className={`${burgerConstructor.element, burgerConstructor.element_type_blocked} mb-4`}>
                    <ConstructorElement type="top" isLocked={true} text={"Краторная булка N-200i"} price={20} thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"} />
            </li>
            <div className={`${burgerConstructor.containerInside} mb-5`}>
                {arrayItem}
                </div>
            <li className={`${burgerConstructor.element, burgerConstructor.element_type_blocked} mb-4 mr-5`}>
                <ConstructorElement type="bottom" isLocked={true} text={"Краторная булка N-200i"} price={200} thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"} />
            </li>
        </ul>
        <div className={burgerConstructor.totalPrice}>
            <div className={`${burgerConstructor.totalPrice__price}`}>
                <p className="text text_type_digits-medium mr-3" >610</p>
                <CurrencyIcon type="primary"/>
            </div>
            <Button type="primary" size="large" onClick={props.openModalOrder}>Оформить заказ</Button>
        </div>
    </section>
   ) 
}

BurgerConstructor.propTypes = {
    ingredients : PropTypes.arrayOf(PropTypes.shape(typesOfIngredients)),
    openModalIngredient: typesOfOpenModalIngredient
}

export default BurgerConstructor