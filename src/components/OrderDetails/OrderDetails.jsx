import orderDetailsStyles from './OrderDetails.module.css';


const OrderDetails = () => {


    return (
        <div className={orderDetailsStyles.container}>
            <p className='text text_type_digits-large'>034536</p>
            <p className={`${orderDetailsStyles.identity} text text_type_main-medium`}>идентификатор заказа</p>
            <button className={orderDetailsStyles.buttonImage}></button>
            <p className={`${orderDetailsStyles.status} text text_type_main-default`}>Ваш заказ начали готовить</p>
            <p className={`${orderDetailsStyles.wait} text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails