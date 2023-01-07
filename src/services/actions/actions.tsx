import { createAction } from "@reduxjs/toolkit";
import { getData, sentDataIngredients } from "../../utils/dataApi";
import {
  AppDispatch,
  TIngredientDetails,
  TIngredient,
  TGetAndUpdateOrders,
} from "../../utils/types/types";

export const getIngredientsForConstructor = createAction(
  "GET_INGREDIENTS_FOR_CONSTRUCTOR"
);
export const addIngredientInConstructor = createAction<
  Array<TIngredientDetails>,
  "ADD_INGREDIENT_IN_CONSTRUCTOR"
>("ADD_INGREDIENT_IN_CONSTRUCTOR");
export const removeIngredientInConstructor = createAction(
  "REMOVE_INGREDIENT_IN_CONSTRUCTOR"
);

export const getIngredientsItemRequest = createAction(
  "GET_INGREDIENTS_ITEM_REQUEST"
);
export const getIngredientsItemSuccess = createAction<
  Array<TIngredient>,
  "GET_INGREDIENTS_ITEM_SUCCESS"
>("GET_INGREDIENTS_ITEM_SUCCESS");
export const getIngredientsItemError = createAction(
  "GET_INGREDIENTS_ITEM_ERROR"
);

export const getAndUpdateNumberOrderItemRequest = createAction(
  "GET_AND_UPDATE_NUMBER_ORDER_REQUEST"
);
export const getAndUpdateNumberOrderItemSuccess = createAction<
  TGetAndUpdateOrders,
  "GET_AND_UPDATE_NUMBER_ORDER_SUCCESS"
>("GET_AND_UPDATE_NUMBER_ORDER_SUCCESS");
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

export const getDataIngredients = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsItemRequest());
    getData()
      .then((data) => {
        if (data && data.success) {
          dispatch(getIngredientsItemSuccess(data.data));
        } else {
          dispatch(getIngredientsItemError());
        }
      })
      .catch((err) => {
        dispatch(getIngredientsItemError());
      });
  };
};

export const sentDataOrder = (
  order: Array<TIngredientDetails>,
  accessToken: string,
  openModalOrder: (num: number) => void
) => {
  return function (dispatch: AppDispatch) {
    dispatch(getAndUpdateNumberOrderItemRequest());
    sentDataIngredients(order, accessToken)
      .then((data) => {
        if (data) {
          dispatch(getAndUpdateNumberOrderItemSuccess(data));
          openModalOrder(data.order.number);
        } else {
          dispatch(getAndUpdateNumberOrderItemError());
        }
      })
      .then(() => dispatch(addIngredientInConstructor([])))
      .catch((err) => dispatch(getAndUpdateNumberOrderItemError()));
  };
};
