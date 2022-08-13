import ingredientDetailsStyles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import { typesOfIngredients } from '../../utils/types'

const IngredientDetails = (props) => {

    const {calories, carbohydrates, image_large, name, proteins, fat} = props.ingredientsInfo


    return (
        <div className={ingredientDetailsStyles.container}>
            <img className={ingredientDetailsStyles.image} src={image_large} alt="Ингредиент" />
            <h2 className={`${ingredientDetailsStyles.title} text text_type_main-medium`}>
                {name}
            </h2>
            <ul className={ingredientDetailsStyles.list}>
                <li className={ingredientDetailsStyles.item}>
                    <p className={`${ingredientDetailsStyles.item__title} text text_type_main-default`}>Калории,ккал</p>
                    <p className='text text_type_digits-default'>{calories}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={`${ingredientDetailsStyles.item__title} text text_type_main-default`}>Белки, г</p>
                    <p className='text text_type_digits-default'>{proteins}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={`${ingredientDetailsStyles.item__title} text text_type_main-default`}>Жиры, г</p>
                    <p className='text text_type_digits-default'>{fat}</p>
                </li>
                <li className={ingredientDetailsStyles.item}>
                    <p className={`${ingredientDetailsStyles.item__title} text text_type_main-default`}>Углеводы, г</p>
                    <p className='text text_type_digits-default'>{carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredientsInfo: PropTypes.shape(typesOfIngredients)
}

export default IngredientDetails