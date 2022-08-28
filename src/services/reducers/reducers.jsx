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
  modalIngredientItemClosed
} from "../actions/actions";

const initialState = {
  ingredients: [],
  ingredientsInConstructor: [],
  ingredient: {},
  order: {},
  isLoading: false,
  isError: false,
  isModalOrder: false,
  v: false
};

export default createReducer(initialState, {
  [getIngredientsForConstructor]: (state, action) => {
    state.ingredientsInConstructor = action.payload;
  },
  [addIngredientInConstructor]: (state, action) => {
    state.ingredientsInConstructor = action.payload;
  },
  [addDataModalIngredient]: (state, action) => {
    state.ingredient = action.payload;
  },
  [removeDataModalIngredient]: (state, action) => {
    state.ingredient = action.payload;
  },
  [getAndUpdateNumberOreder]: (state, action) => {
    state.order = action.payload;
  },
  [removeIngredientInConstructor]: (state, action) => {
    state.ingredientsInConstructor = action.payload;
  },
  [getIngredientsItemRequest]: (state) => {
    return {
    ...state,
    isLoading: true,
    isError: false
    }
  },
  [getIngredientsItemSuccess]: (state, action) => {
    return {
      ...state,
      sLoading: false,
      ingredients: action.payload
    }
  },
  [getIngredientsItemError]: state => {
    return {
      ...state,
      isLoading: false,
      isError: true
    }
  },
  [getAndUpdateNumberOrderItemRequest]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false
    }
  },
  [getAndUpdateNumberOrderItemSuccess]: (state, action) => {
    return {
      ...state,
      sLoading: false,
      order: action.payload,
      isModalOrder: true
    }
  },
  [getAndUpdateNumberOrderItemError]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true
    }
  },
  [modalOrderItemOpen]: (state, action) => {
    return {
      ...state,
      isModalOrder: action.payload
    }
  },
  [modalOrderItemClosed]: (state, action) => {
    return {
      ...state,
      isModalOrder: action.payload
    }
  },
  [modalIngredientItemOpen]: (state, action) => {
    return {
      ...state,
      isModalIngredient: action.payload
    }
  },
  [modalIngredientItemClosed]: (state, action) => {
    return {
      ...state,
      isModalIngredient: action.payload
    }
  },
  default: state => state
});
