import { useState } from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import CardIngredient from "../CardIngredient/CardIngredient";
import PropTypes, { arrayOf } from 'prop-types';



const BurgerIngredients = (props) => {

    const ingredients = props.ingredients.data


    const [bunTab, setBunTab] = useState(true)
    const [sauceTab, setSauceTab] = useState(false)
    const [mainTab, setMainTab] = useState(false)

    const changeItem = (e) => {
        if (e === "bun") {
            setBunTab(true)
            setSauceTab(false)
            setMainTab(false)
        }
        if (e === "sauce") {
            setBunTab(false)
            setSauceTab(true)
            setMainTab(false)
        }
        if (e === "main") {
            setBunTab(false)
            setSauceTab(false)
            setMainTab(true)
        }

    }



        const newData = ingredients ? ingredients.map(i => <CardIngredient key={i._id} id={i._id} {...i} openModalIngredient={props.openModalIngredient} />) : null

        const bun =  newData !== null && newData.filter(i => i.props.type === "bun")
        const sauce = newData !== null &&  newData.filter(i => i.props.type === "sauce")
        const main = newData !== null &&  newData.filter(i => i.props.type === "main")
        
        return (
            <>
                <section className={burgerIngredientsStyles.container}>
                    <h1 className={`text text_type_main-large ${burgerIngredientsStyles.title}`}>Соберите бургер</h1>
                    <nav className={burgerIngredientsStyles.nav__container}>
                        <a href="#bun"><Tab value="bun" active={bunTab} onClick={changeItem}>Булки</Tab></a>
                        <a href="#sauce"><Tab value="sauce" active={sauceTab} onClick={changeItem}>Соусы</Tab></a>
                        <a href="#main"><Tab value="main" active={mainTab} onClick={changeItem}>Начинки</Tab></a>
                    </nav>
                    <div className={burgerIngredientsStyles.ingredients}>
                        <h2 id="bun" className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mt-5`}>Булки</h2>
                       <div className={burgerIngredientsStyles.ingredient}>
                        {bun}
                       </div>
                       <h2 id="sauce" className={`${burgerIngredientsStyles.ingredients__title_type_exactFirst} text text_type_main-medium mt-5`}>Соусы</h2>
                       <div className={burgerIngredientsStyles.ingredient}>
                        {sauce}
                       </div>
                       <h2 id="main" className={`${burgerIngredientsStyles.ingredients__title_type_exactFirst} text text_type_main-medium mt-5`}>Начинки</h2>
                       <div className={burgerIngredientsStyles.ingredient}>
                        {main}
                       </div>
                    </div>
                </section>
            </>
        )
}

BurgerIngredients.propTypes = {
    ingredients : PropTypes.shape({
        data: PropTypes.arrayOf(Object),
    })
}

export default BurgerIngredients
