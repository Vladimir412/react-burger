import { createAction } from "@reduxjs/toolkit";

export const getIngredients = createAction("GET_INGREDIENTS");
export const getIngredientsForConstructor = createAction(
  "GET_INGREDIENTS_FOR_CONSTRUCTOR"
);
export const addIngredientInConstructor = createAction(
  "ADD_INGREDIENT_IN_CONSTRUCTOR"
);
export const removeIngredientInConstructor = createAction(
  "REMOVE_INGREDIENT_IN_CONSTRUCTOR"
);
export const addDataModalIngredient = createAction("ADD_DATA_MODAL_INGREDIENT");
export const removeDataModalIngredient = createAction(
  "REMOVE_DATA_MODAL_INGREDIENT"
);
export const getAndUpdateNumberOreder = createAction(
  "GET_AND_UPDATE_NUMBER_ORDER"
);
