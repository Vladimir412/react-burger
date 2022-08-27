import { createReducer } from "@reduxjs/toolkit";
import {
  getIngredients,
  getIngredientsForConstructor,
  addDataModalIngredient,
  removeDataModalIngredient,
  getAndUpdateNumberOreder,
  addIngredientInConstructor,
  removeIngredientInConstructor,
} from "../actions/actions";

const initialState = {
  ingredients: [],
  ingredientsInConstructor: [],
  ingredient: {},
  order: {},
};

export default createReducer(initialState, {
  [getIngredients]: (state, action) => {
    state.ingredients = action.payload;
  },
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
});
