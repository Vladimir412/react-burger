import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import itemBurgerConstructorStyles from './ItemBurgerConstructor.module.css'
import PropTypes from 'prop-types';


const ItemBurgerConstructor = (props) => {

return (
    <>
        <DragIcon type="primary" />
        <div className={itemBurgerConstructorStyles.element__info}>
            <ConstructorElement type={undefined} isLocked={false} text={props.name} price={30} thumbnail={props.image}/>
        </div>
    </>
)

}

ItemBurgerConstructor.propTypes = {
    calories: PropTypes.number,
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    price: PropTypes.number,
    proteins: PropTypes.number,
    image: PropTypes.string,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    _id: PropTypes.string,
}

export default ItemBurgerConstructor