import React from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button  } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructor from './BurgerConstructor.module.css';
import data from "../../utils/data";



class BurgerConstructor extends React.Component {


render() {

   return (
    <section>
        <ul className={burgerConstructor.container}>
            <li className={`${burgerConstructor.element, burgerConstructor.element_type_blocked} mb-4`}>
                {/* <div className={`${burgerConstructor.element__info, burgerConstructor.element__info_type_outside}`}> */}
                    <ConstructorElement type="top" isLocked={true} text={data[0].name} price={20} thumbnail={data[0].image} />
                {/* </div> */}
            </li>
            <div className={`${burgerConstructor.containerInside} mb-5`}>
                <li className={`${burgerConstructor.element} mb-4`}>
                    <DragIcon type="primary" />
                    <div className={burgerConstructor.element__info}>
                    <ConstructorElement type={undefined} isLocked={false} text={data[5].name} price={30} thumbnail={data[5].image} />
                    </div>
                </li>
                <li className={`${burgerConstructor.element} mb-4`}>
                    <DragIcon type="primary" />
                    <div className={burgerConstructor.element__info}>
                        <ConstructorElement type={undefined} isLocked={false} text={data[4].name} price={300} thumbnail={data[4].image} />
                    </div>
                    
                </li>
                <li className={`${burgerConstructor.element} mb-4`}>
                    <DragIcon type="primary" />
                    <div className={burgerConstructor.element__info}>
                    <ConstructorElement type={undefined} isLocked={false} text={data[4].name} price={300} thumbnail={data[4].image} />
                    </div>
                    
                </li>
                <li className={`${burgerConstructor.element} mb-4`}>
                    <DragIcon type="primary" />
                    <div className={burgerConstructor.element__info}>
                    <ConstructorElement type={undefined} isLocked={false} text={data[4].name} price={300} thumbnail={data[4].image} />
                    </div>
                    
                </li>
                <li className={`${burgerConstructor.element} mb-4`}>
                    <DragIcon type="primary" />
                    <div className={burgerConstructor.element__info}>
                    <ConstructorElement type={undefined} isLocked={false} text={data[7].name} price={80} thumbnail={data[7].image} />
                    </div>
                    
                </li>
                <li className={`${burgerConstructor.element} mb-4`}>
                    <DragIcon type="primary" />
                    <div className={burgerConstructor.element__info}>
                    <ConstructorElement type={undefined} isLocked={false} text={data[8].name} price={80} thumbnail={data[8].image} />
                    </div>
                    
                </li>
                <li className={`${burgerConstructor.element} mb-4`}>
                    <DragIcon type="primary" />
                    <div className={burgerConstructor.element__info}>
                    <ConstructorElement type={undefined} isLocked={false} text={data[8].name} price={80} thumbnail={data[8].image} />
                    </div>
                    
                    </li>
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
            <Button type="primary" size="large">Оформить заказ</Button>
        </div>
    </section>
   ) 
}
}

export default BurgerConstructor