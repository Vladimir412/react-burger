import {
    getIngredientsForConstructor,
    addIngredientInConstructor,
    removeIngredientInConstructor,
    addDataModalIngredient,
    removeDataModalIngredient,
    getAndUpdateNumberOreder,
    getIngredientsItemRequest,
    getIngredientsItemSuccess,
    getIngredientsItemError,
    getAndUpdateNumberOrderItemRequest,
    getAndUpdateNumberOrderItemSuccess,
    getAndUpdateNumberOrderItemError,
} from '../../services/actions/actions'
import { TIngredient, IItemBurgerConstructor } from './types'

type TGetIngredientsForConstructor = {//+
    type: typeof getIngredientsForConstructor;
    payload: Array<TIngredient>
}

type TAddIngredientInConstructor = {
    type: typeof addIngredientInConstructor;
    payload: any;
}

type TRemoveIngredientInConstructor = {
    type: typeof removeIngredientInConstructor;
    payload: any;
}

type TAddDataModalIngredient = {
    type: typeof addDataModalIngredient;
    payload: any;
}

type TRemoveDataModalIngredient = {
    type: typeof removeDataModalIngredient;
    payload: any
}

type TGetAndUpdateNumberOreder = {
    type: typeof getAndUpdateNumberOreder;
    payload: any;
}

type TGetIngredientsItemRequest = {
    type: typeof getIngredientsItemRequest;
}

type TGetIngredientsItemSuccess = {
    type: typeof getIngredientsItemSuccess;
    payload: any;
}

type TGetIngredientsItemError = {
    type: typeof getIngredientsItemError;
}

type TGetAndUpdateNumberOrderItemRequest = {
    type: typeof getAndUpdateNumberOrderItemRequest;
}

type TGetAndUpdateNumberOrderItemSuccess = {
    type: typeof getAndUpdateNumberOrderItemSuccess;
    payload: any;//????????????????????
}

type TGetAndUpdateNumberOrderItemError = {
    type: typeof getAndUpdateNumberOrderItemError;
}

export type TActionsActions =
    | TGetIngredientsForConstructor
    | TAddIngredientInConstructor
    | TRemoveIngredientInConstructor
    | TAddDataModalIngredient
    | TRemoveDataModalIngredient
    | TGetAndUpdateNumberOreder
    | TGetIngredientsItemRequest
    | TGetIngredientsItemSuccess
    | TGetIngredientsItemError
    | TGetAndUpdateNumberOrderItemRequest
    | TGetAndUpdateNumberOrderItemSuccess
    | TGetAndUpdateNumberOrderItemError