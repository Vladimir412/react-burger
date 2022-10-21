import { FC, useEffect } from "react";
import orderInformationStyles from "./OrderInformation.module.css";
import OrderInformationItem from "../OrderInformationItem/OrderInformationItem";
import { useAppSelector, useAppDispatch } from "../../utils/hooks";
import { useParams } from "react-router-dom";
import {
  wsConnectClosed,
  wsConnectStart,
} from "../../services/actions/wsActionTypes";
import { v4 as uuidv4 } from "uuid";

const OrderInformation: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsConnectStart());
    console.log("Start");

    return () => {
      dispatch(wsConnectClosed());
      console.log("closed");
    };
  }, []);

  const { orders } = useAppSelector((state) => state.wsReducer); // массив заказов
  const { ingredients } = useAppSelector((state) => state.ingredientReducers); // массив ингредиентов
  const orderId = useParams<{ id: string }>();
  let data: any = [];

  const orderArray = orders.find((i: any) => i._id === orderId.id);

  orderArray.ingredients.forEach((i: any) => {
    let image: string = "";
    let name: string = "";
    let price: number = 0;
    let id: string = ""
    let quantity: number = 1
    ingredients.forEach((j: any) => {
      if (i === j._id) {
        id = j._id
        name = j.name;
        price = j.price;
        image = j.image;
        quantity = 1
      }      
    });
    
    data.push(
      <li key={uuidv4()} id={id}>
        <OrderInformationItem image={image} title={name} price={price} quantity={quantity} />
      </li>
    );
  });

  // console.log(data);

  // ingredients.forEach((i: any) => {

  //  orderArray.ingredients.forEach((j: any) => {

  //     if (j === i._id) {
  //       return <li key={uuidv4()}>
  //         <OrderInformationItem
  //           image={i.image}
  //           title={i.name}
  //         />
  //       </li>

  //       arrayImage.push(i.image)
  //     }
  //   })
  // })

  return (
    <div className={`${orderInformationStyles.container}`}>
      <p
        className={`${orderInformationStyles.orderNumber} text text_type_digits-default`}
      >
        #034533
      </p>
      <h1 className={`text text_type_main-medium`}>{}</h1>
      <h2 className={`text text_type_main-medium`}>Состав:</h2>
      <ul className={orderInformationStyles.lists}>{data}</ul>
    </div>
  );
};

export default OrderInformation;
