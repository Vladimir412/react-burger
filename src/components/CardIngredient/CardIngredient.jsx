import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cardIngredientStyles from './CardIngredient.module.css'

const CardIngredient = (props) => {

    return (
        <article className={`${cardIngredientStyles.product__container}`}>
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

export default CardIngredient