import { createReducer } from "@reduxjs/toolkit";
import {
  userInfoItemRequest,
  userInfoItemSuccess,
  userInfoItemFailed,
  userInfoUpdateItemRequest,
  userInfoUpdateItemSuccess,
  userInfoUpdateItemFailed,
} from "../actions/userInfo";

const userInitialState = {
  name: "",
  email: "",
  isLoading: false,
  isError: false,
};

export default createReducer(userInitialState, {
  [userInfoItemRequest]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [userInfoItemSuccess]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      name: action.payload.user.name,
      email: action.payload.user.email,
    };
  },
  [userInfoItemFailed]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [userInfoUpdateItemRequest]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [userInfoUpdateItemSuccess]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      name: action.payload.user.name,
      email: action.payload.user.email,
    };
  },
  [userInfoUpdateItemFailed]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  default: (state) => state,
});
