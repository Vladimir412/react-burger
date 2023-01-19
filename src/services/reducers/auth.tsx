import { createReducer } from "@reduxjs/toolkit";
import {
  registerUserItemSuccess,
  registerUserItemRequest,
  registerUserItemFailed,
  loginUserItemRequest,
  loginUserItemSuccess,
  loginUserItemFailed,
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

type TAuthInitialState = {
  isLoading: boolean;
  isError: boolean;
  accessToken: string;
  isLogged: boolean;
};

const authInitialState: TAuthInitialState = {
  isLoading: false,
  isError: false,
  accessToken: "",
  isLogged: false,
};

export default createReducer(authInitialState, {
  [registerUserItemSuccess.type]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      accessToken: action.payload.accessToken,
    };
  },
  [registerUserItemRequest.type]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [registerUserItemFailed.type]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [loginUserItemRequest.type]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [loginUserItemSuccess.type]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      isLogged: true,
      accessToken: action.payload.accessToken,
    };
  },
  [loginUserItemFailed.type]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [resetPasswordUserItemRequest.type]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [resetPasswordUserItemSuccess.type]: (state) => {
    return {
      ...state,
      isLoading: false,
    };
  },
  [resetPasswordUserItemFailed.type]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [forgotPassworUser.type]: (state, action) => {
    return {
      ...state,
      accessToken: action.token,
    };
  },
  [logOutItemRequest.type]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [logOutItemSuccess.type]: (state) => {
    return {
      isLoading: false,
      isError: false,
      isLogged: false,
      accessToken: "",
    };
  },
  [logOutItemFailed.type]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [upadateUserItemRequest.type]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [upadateUserItemSuccess.type]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      accessToken: action.payload.accessToken,
    };
  },
  [upadateUserItemFailed.type]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  default: (state) => state,
});
