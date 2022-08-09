import { useState } from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import data from "../../utils/data";
import CardIngredient from "../CardIngredient/CardIngredient";

const BurgerIngredients = props => {


    const [oneTab, setOneTab] = useState(true)
    const [twoTab, setTwoTab] = useState(false)
    const [threeTab, setThreeTab] = useState(false)

    const changeItem = (e) => {
        if (e === "one") {
            setOneTab(true)
            setTwoTab(false)
            setThreeTab(false)
        }
        if (e === "two") {
            setOneTab(false)
            setTwoTab(true)
            setThreeTab(false)
        }
        if (e === "three") {
            setOneTab(false)
            setTwoTab(false)
            setThreeTab(true)
        }

    }



        const newData = data.map(i => <CardIngredient key={i._id} {...i} />)

        const bun = newData.filter(i => i.props.type === "bun" ? i : null)
        const sauce = newData.filter(i => i.props.type === "sauce" ? i : null)
        const main = newData.filter(i => i.props.type === "main" ? i : null)
        
        return (
            <>
                <section className={burgerIngredientsStyles.container}>
                    <h1 className={`text text_type_main-large ${burgerIngredientsStyles.title}`}>Соберите бургер</h1>
                    <nav className={burgerIngredientsStyles.nav__container}>
                        <a href="#bun"><Tab value="one" active={oneTab} onClick={changeItem}>Булки</Tab></a>
                        <a href="#sauce"><Tab value="two" active={twoTab} onClick={changeItem}>Соусы</Tab></a>
                        <a href="#main"><Tab value="three" active={threeTab} onClick={changeItem}>Начинки</Tab></a>
                    </nav>
                    <div className={burgerIngredientsStyles.ingredients}>
                        <h2 id="bun" className={`${burgerIngredientsStyles.ingredients__title} text text_type_main-medium mt-5`}>Булки</h2>
                       <div className={burgerIngredientsStyles.ingredient}>
                        {bun}
                       </div>
                       <h2 id="sauce" className="text text_type_main-medium mt-5">Соусы</h2>
                       <div className={burgerIngredientsStyles.ingredient}>
                        {sauce}
                       </div>
                       <h2 id="main" className="text text_type_main-medium mt-5">Начинки</h2>
                       <div className={burgerIngredientsStyles.ingredient}>
                        {main}
                       </div>
                    </div>
                </section>
            </>
        )
}

export default BurgerIngredients

function handleItem() {
    throw new Error("Function not implemented.");
}
