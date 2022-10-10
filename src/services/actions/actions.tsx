import { createAction } from "@reduxjs/toolkit";
import { getData, sentDataIngredients } from "../../utils/dataApi";
import { AppThunk, AppDispatch } from "../../utils/types/types";

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
export const getIngredientsItemRequest = createAction(
  "GET_INGREDIENTS_ITEM_REQUEST"
);
export const getIngredientsItemSuccess = createAction(
  "GET_INGREDIENTS_ITEM_SUCCESS"
);
export const getIngredientsItemError = createAction(
  "GET_INGREDIENTS_ITEM_ERROR"
);

export const getAndUpdateNumberOrderItemRequest = createAction(
  "GET_AND_UPDATE_NUMBER_ORDER_REQUEST"
);
export const getAndUpdateNumberOrderItemSuccess = createAction(
  "GET_AND_UPDATE_NUMBER_ORDER_SUCCESS"
);
export const getAndUpdateNumberOrderItemError = createAction(
  "GET_AND_UPDATE_NUMBER_ORDER_ERROR"
);

export const modalOrderItemOpen = createAction("MODAL_ORDER_ITEM_OPEN");
export const modalOrderItemClosed = createAction("MODAL_ORDER_ITEM_CLOSED");

export const modalIngredientItemOpen = createAction(
  "MODAL_INGREDIENT_ITEM_OPEN"
);
export const modalIngredientItemClosed = createAction(
  "MODAL_INGREDIENT_ITEM_CLOSED"
);

export const getDataIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsItemRequest());
    getData()
      .then((data) => {
        if (data) {
          dispatch(getIngredientsItemSuccess(data));
        } else {
          dispatch(getIngredientsItemError());
        }
      })
      .catch((err) => {
        dispatch(getIngredientsItemError());
      });
  };
};

export const sentDataOrder: AppThunk = (order: any, accessToken: string, openModalOrder: () => void) => {
  return function (dispatch: AppDispatch) {
    dispatch(getAndUpdateNumberOrderItemRequest());
    sentDataIngredients(order, accessToken)
      .then((data) => {
        console.log(data);
        
        if (data) {
          dispatch(getAndUpdateNumberOrderItemSuccess(data));
          openModalOrder(data.order.number)
        } else {
          dispatch(getAndUpdateNumberOrderItemError());
        }
      })
      .then(() => dispatch(addIngredientInConstructor([])))
      .catch((err) => dispatch(getAndUpdateNumberOrderItemError()));
  };
};
