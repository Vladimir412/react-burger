import React from "react"
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import headerStyles from './AppHeader.module.css'


class AppHeader extends React.Component {


    render() {
        return (
            <header className={headerStyles.container}>
                <nav className={headerStyles.navigation}>
                    <ul className={`${headerStyles.list}`}>
                        <li className={headerStyles.item}>
                            <BurgerIcon type="primary"/>
                            <p className="text text_type_main-default ml-2">Конструктор</p>
                        </li>
                        <li className={`${headerStyles.item}`}>
                            <ListIcon  type="primary" />
                            <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                        </li>
                    </ul>
                    <div className={headerStyles.logo__container}>
                        <Logo />
                    </div>
                    <div className={`${headerStyles.profile__container} mt-8`}>
                        <ProfileIcon type="primary"/>
                        <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
                    </div>
                </nav>
            </header>
        )
    }
}

export default AppHeader