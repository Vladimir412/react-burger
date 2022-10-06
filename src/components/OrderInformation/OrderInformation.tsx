import { FC } from "react";
import orderInformationStyles from "./OrderInformation.module.css";

const OrderInformation: FC = () => {

    console.log('gg');
    

  return (
    <div className={`${orderInformationStyles.container}`}>
      <p className={`${orderInformationStyles.orderNumber} text text_type_digits-default`}>#034533</p>
      <h1 className={`text text_type_main-medium`}>Black Hole Singularity острый бургер</h1>
      <div>
        <h2 className={`text text_type_main-medium`}>Состав:</h2>
      </div>
    </div>
  );
};

export default OrderInformation;
