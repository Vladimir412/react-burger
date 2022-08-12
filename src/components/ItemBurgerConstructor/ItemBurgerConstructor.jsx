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
    name: PropTypes.string,
    image: PropTypes.string
}

export default ItemBurgerConstructor