import {
    getIngredientsForConstructor,
    addIngredientInConstructor,
    removeIngredientInConstructor,
    // addDataModalIngredient,
    // removeDataModalIngredient,
    // getAndUpdateNumberOreder,
    getIngredientsItemRequest,
    getIngredientsItemSuccess,
    getIngredientsItemError,
    getAndUpdateNumberOrderItemRequest,
    getAndUpdateNumberOrderItemSuccess,
    getAndUpdateNumberOrderItemError,
} from '../../services/actions/actions'
import { TIngredient, TIngredientDetails, TGetAndUpdateOrders } from './types'

type TGetIngredientsForConstructor = {//+
    type: typeof getIngredientsForConstructor;
    // payload: any;
}

type TAddIngredientInConstructor = {
    type: typeof addIngredientInConstructor;
    payload: TIngredientDetails;
}

type TRemoveIngredientInConstructor = {
    type: typeof removeIngredientInConstructor;
    // payload: any;
}

// type TAddDataModalIngredient = {
//     type: typeof addDataModalIngredient;
//     payload: any;
// }

// type TRemoveDataModalIngredient = {
//     type: typeof removeDataModalIngredient;
//     payload: any
// }

// type TGetAndUpdateNumberOreder = {
//     type: typeof getAndUpdateNumberOreder;
//     payload: any;//???????
// }

type TGetIngredientsItemRequest = {
    type: typeof getIngredientsItemRequest;
}

export type TGetIngredientsItemSuccess = {
    type: typeof getIngredientsItemSuccess;
    payload: Array<TIngredient>;
}

type TGetIngredientsItemError = {
    type: typeof getIngredientsItemError;
}

type TGetAndUpdateNumberOrderItemRequest = {
    type: typeof getAndUpdateNumberOrderItemRequest;
}

type TGetAndUpdateNumberOrderItemSuccess = {
    type: typeof getAndUpdateNumberOrderItemSuccess;
    payload: TGetAndUpdateOrders
}

type TGetAndUpdateNumberOrderItemError = {
    type: typeof getAndUpdateNumberOrderItemError;
}

export type TActionsActions =
    | TGetIngredientsForConstructor
    | TAddIngredientInConstructor
    | TRemoveIngredientInConstructor
    // | TAddDataModalIngredient
    // | TRemoveDataModalIngredient
    // | TGetAndUpdateNumberOreder
    | TGetIngredientsItemRequest
    | TGetIngredientsItemSuccess
    | TGetIngredientsItemError
    | TGetAndUpdateNumberOrderItemRequest
    | TGetAndUpdateNumberOrderItemSuccess
    | TGetAndUpdateNumberOrderItemError