import { createReducer } from "@reduxjs/toolkit";
import {
  userInfoItemRequest,
  userInfoItemSuccess,
  userInfoItemFailed,
  userInfoUpdateItemRequest,
  userInfoUpdateItemSuccess,
  userInfoUpdateItemFailed,
} from "../actions/userInfo";
import { TUserInfoActions } from '../../utils/types/typesActionUserInfo'

type TUserInitialState = {
  name: string;
  email: string;
  isLoading: boolean;
  isError: boolean;
};

const userInitialState: TUserInitialState = {
  name: "",
  email: "",
  isLoading: false,
  isError: false,
};

export default createReducer(userInitialState, {
  [userInfoItemRequest.type]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [userInfoItemSuccess.type]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      name: action.payload.user.name,
      email: action.payload.user.email,
    };
  },
  [userInfoItemFailed.type]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  [userInfoUpdateItemRequest.type]: (state) => {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  },
  [userInfoUpdateItemSuccess.type]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      name: action.payload.user.name,
      email: action.payload.user.email,
    };
  },
  [userInfoUpdateItemFailed.type]: (state) => {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  },
  default: (state) => state,
});
