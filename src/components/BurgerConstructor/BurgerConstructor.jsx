import { ConstructorElement, CurrencyIcon, Button  } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from './BurgerConstructor.module.css';
import data from "../../utils/data";
import PropTypes from 'prop-types';
import ItemBurgerConstructor from "../ItemBurgerConstructor/ItemBurgerConstructor";




const BurgerConstructor = (props) => {
    const array = props.ingredients.data

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
                    <ConstructorElement type="top" isLocked={true} text={data[0].name} price={20} thumbnail={data[0].image} />
            </li>
            <div className={`${burgerConstructor.containerInside} mb-5`}>
                {arrayItem}
                </div>
            <li className={`${burgerConstructor.element, burgerConstructor.element_type_blocked} mb-4 mr-5`}>
                <ConstructorElement type="bottom" isLocked={true} text={data[0].name} price={200} thumbnail={data[0].image} />
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
    ingredients : PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ])
}

export default BurgerConstructor