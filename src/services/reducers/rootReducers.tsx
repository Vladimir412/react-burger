import { combineReducers } from "@reduxjs/toolkit";
import ingredientReducers from "./reducers";
import authReducer from "./auth";
import userReducer from "./userInfo";
import wsReducer from "./wsReducer";

export const rootReducer = combineReducers({
  ingredientReducers,
  authReducer,
  userReducer,
  wsReducer,
});
