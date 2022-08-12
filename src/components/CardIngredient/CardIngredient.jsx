import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cardIngredientStyles from './CardIngredient.module.css'
import PropTypes from 'prop-types';


const CardIngredient = (props) => {
    
    const onHandleClick = () => {
        props.openModalIngredient(props)

    }


    return (
        <article className={`${cardIngredientStyles.product__container}`} onClick={onHandleClick}>
            <Counter count={1} size="default"/>
            <img className={cardIngredientStyles.image} src={props.image} alt="Продукт" />
            <div className={cardIngredientStyles.price}>
                <p className="mr-2">{props.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <h2 className={`${cardIngredientStyles.title} text text_type_main-default`}>{props.name}</h2>
        </article>
    )
        
}

CardIngredient.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    openModalIngredient: PropTypes.func,
    price: PropTypes.number
}

export default CardIngredient