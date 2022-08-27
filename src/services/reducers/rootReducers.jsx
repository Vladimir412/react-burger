import { combineReducers } from "@reduxjs/toolkit";
import ingredientReducers from "../reducers/reducers";

export const rootReducer = combineReducers({
  ingredientReducers,
});
