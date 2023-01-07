import {
  registerUserItemRequest,
  registerUserItemSuccess,
  registerUserItemFailed,
  loginUserItemRequest,
  loginUserItemSuccess,
  loginUserItemFailed,
  resetPasswordUserItemRequest,
  resetPasswordUserItemSuccess,
  resetPasswordUserItemFailed,
  logOutItemRequest,
  logOutItemSuccess,
  logOutItemFailed,
  upadateUserItemRequest,
  upadateUserItemSuccess,
  upadateUserItemFailed,
  forgotPassworUser,
} from "../../services/actions/auth";
import {
  TRegisterUserItemSuccess as TRegUserItemSuccess,
  TRecoveryPasswordAndResetPasswordAndLogout,
  TUpdateUserItem,
  TAccessToken,
} from "./types";

type TRegisterUserItemRequest = {
  type: typeof registerUserItemRequest;
};

type TRegisterUserItemSuccess = {
  type: typeof registerUserItemSuccess;
  payload: TRegUserItemSuccess;
};

type TRegisterUserItemFailed = {
  type: typeof registerUserItemFailed;
};

type TLoginUserItemRequest = {
  type: typeof loginUserItemRequest;
};

type TLoginUserItemSuccess = {
  type: typeof loginUserItemSuccess;
  payload: TRegUserItemSuccess;
};

type TLoginUserItemFailed = {
  type: typeof loginUserItemFailed;
};

type TResetPasswordUserItemRequest = {
  type: typeof resetPasswordUserItemRequest;
};

type TResetPasswordUserItemSuccess = {
  type: typeof resetPasswordUserItemSuccess;
};

type TResetPasswordUserItemFailed = {
  type: typeof resetPasswordUserItemFailed;
};

type TForgotPassworUser = {
  type: typeof forgotPassworUser;
  payload: TRecoveryPasswordAndResetPasswordAndLogout;
};

type TLogOutItemRequest = {
  type: typeof logOutItemRequest;
};

type TLogOutItemSuccess = {
  type: typeof logOutItemSuccess;
  payload: TRecoveryPasswordAndResetPasswordAndLogout;
};

type TLogOutItemFailed = {
  type: typeof logOutItemFailed;
};

type TUpadateUserItemRequest = {
  type: typeof upadateUserItemRequest;
};

type TUpadateUserItemSuccess = {
  type: typeof upadateUserItemSuccess;
  payload: TUpdateUserItem;
};

type TUpadateUserItemFailed = {
  type: typeof upadateUserItemFailed;
  payload: TRecoveryPasswordAndResetPasswordAndLogout;
};

export type TActionsAuth =
  | TRegisterUserItemRequest
  | TRegisterUserItemSuccess
  | TRegisterUserItemFailed
  | TLoginUserItemRequest
  | TLoginUserItemSuccess
  | TLoginUserItemFailed
  | TResetPasswordUserItemRequest
  | TResetPasswordUserItemSuccess
  | TResetPasswordUserItemFailed
  | TLogOutItemRequest
  | TLogOutItemSuccess
  | TLogOutItemFailed
  | TUpadateUserItemRequest
  | TUpadateUserItemSuccess
  | TUpadateUserItemFailed
  | TForgotPassworUser;
