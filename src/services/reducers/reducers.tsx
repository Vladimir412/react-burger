import { createReducer } from "@reduxjs/toolkit";
import {
  getIngredientsForConstructor,
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
import {
  TIngredient,
  IItemBurgerConstructor,
  TGetAndUpdateOrders,
} from "../../utils/types/types";

type TInitialState = {
  ingredients: Array<TIngredient>;
  ingredientsInConstructor: Array<IItemBurgerConstructor>;
  order: TGetAndUpdateOrders;
  isLoading: boolean;
  isError: boolean;
  isModalOrder: boolean;
};

const initialState: TInitialState = {
  ingredients: [],
  ingredientsInConstructor: [],
  order: {
    success: false,
    name: "",
    order: {
      ingredients: [],
      _id: "",
      owner: {
        name: "",
        email: "",
        createdAt: "",
        updatedAt: "",
      },
      status: "",
      name: "",
      createdAt: "",
      updatedAt: "",
      number: 0,
      price: 0,
    },
  },
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
