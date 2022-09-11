import { createReducer } from "@reduxjs/toolkit";
import {
  registerUserItemSuccess,
  registerUserItemRequest,
  registerUserItemFailed,
  loginUserItemRequest,
  loginUserItemSuccess,
  loginUserItemFailed,
  loginUserItemRedirect,
  resetPasswordUserItemRequest,
  resetPasswordUserItemSuccess,
  resetPasswordUserItemFailed,
  forgotPassworUser,
  logOutItemRequest,
  logOutItemSuccess,
  logOutItemFailed,
  upadateUserItemRequest,
  upadateUserItemSuccess,
  upadateUserItemFailed,
} from "../actions/auth";
import { updateTokenUser } from '../actions/userInfo'

const authInitialState = {
  isLoading: false,
  isError: false,
  accessToken: "",
  isLogged: false,
};

export default createReducer(authInitialState, {
  [registerUserItemSuccess]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      accessToken: action.payload.accessToken,
    };
  },
  [registerUserItemRequest]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [registerUserItemFailed]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [loginUserItemRequest]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [loginUserItemSuccess]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      isLogged: true,
      accessToken: action.payload.accessToken,
    };
  },
  [loginUserItemFailed]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [resetPasswordUserItemRequest]: (state, action) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [resetPasswordUserItemSuccess]: (state) => {
    return {
      ...state,
      isLoading: false,
    };
  },
  [resetPasswordUserItemFailed]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [forgotPassworUser]: (state, action) => {
    return {
      ...state,
      accessToken: action.token,
    };
  },
  [logOutItemRequest]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [logOutItemSuccess]: (state) => {
    return {
      isLoading: false,
      isError: false,
      isLogged: false,
      accessToken: "",
    };
  },
  [logOutItemFailed]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [upadateUserItemRequest]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [upadateUserItemSuccess]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      accessToken: action.payload.accessToken,
    };
  },
  [upadateUserItemFailed]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [updateTokenUser]: (state, action) => {
    return {
      ...state,
      accessToken: action.payload.accessToken
    }
  },
  default: (state) => state,
});
