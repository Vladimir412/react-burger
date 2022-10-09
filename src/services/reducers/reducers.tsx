import { createReducer } from "@reduxjs/toolkit";
import {
  getIngredientsForConstructor,
  addDataModalIngredient,
  removeDataModalIngredient,
  getAndUpdateNumberOreder,
  addIngredientInConstructor,
  removeIngredientInConstructor,
  getIngredientsItemRequest,
  getIngredientsItemSuccess,
  getIngredientsItemError,
  getAndUpdateNumberOrderItemRequest,
  getAndUpdateNumberOrderItemSuccess,
  getAndUpdateNumberOrderItemError,
  modalOrderItemOpen,
  modalOrderItemClosed,
  modalIngredientItemOpen,
  modalIngredientItemClosed,
} from "../actions/actions";
import { TIngredientDetails, TIngredient, IItemBurgerConstructor } from '../../utils/types/types'

type TInitialState = {
  ingredients: Array<TIngredient>,
  ingredientsInConstructor: Array<IItemBurgerConstructor>,
  ingredient: any;
  order: any;
  isLoading: boolean;
  isError: boolean;
  isModalOrder: boolean;
}

const initialState: TInitialState = {
  ingredients: [],
  ingredientsInConstructor: [],
  ingredient: {},
  order: {},
  isLoading: false,
  isError: false,
  isModalOrder: false,
};

export default createReducer(initialState, {
  [getIngredientsForConstructor.type]: (state, action) => {
    state.ingredientsInConstructor = action.payload;
  },
  [addIngredientInConstructor.type]: (state, action) => {
    state.ingredientsInConstructor = action.payload;
  },
  [addDataModalIngredient.type]: (state, action) => {
    state.ingredient = action.payload;
  },
  [removeDataModalIngredient.type]: (state, action) => {
    state.ingredient = action.payload;
  },
  [getAndUpdateNumberOreder.type]: (state, action) => {
    state.order = action.payload;
  },
  [removeIngredientInConstructor.type]: (state, action) => {
    state.ingredientsInConstructor = action.payload;
  },
  [getIngredientsItemRequest.type]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [getIngredientsItemSuccess.type]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      ingredients: action.payload,
    };
  },
  [getIngredientsItemError.type]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [getAndUpdateNumberOrderItemRequest.type]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [getAndUpdateNumberOrderItemSuccess.type]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      order: action.payload,
      // isModalOrder: true,
    };
  },
  [getAndUpdateNumberOrderItemError.type]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [modalOrderItemOpen.type]: (state, action) => {
    return {
      ...state,
      isModalOrder: action.payload,
    };
  },
  [modalOrderItemClosed.type]: (state, action) => {
    return {
      ...state,
      isModalOrder: action.payload,
    };
  },
  [modalIngredientItemOpen.type]: (state, action) => {
    return {
      ...state,
      isModalIngredient: action.payload,
    };
  },
  [modalIngredientItemClosed.type]: (state, action) => {
    return {
      ...state,
      isModalIngredient: action.payload,
    };
  },
  default: (state) => state,
});
