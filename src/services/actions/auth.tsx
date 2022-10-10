import { createAction } from "@reduxjs/toolkit";
import {
  signUp,
  signIn,
  recoveryPassword,
  resetPassword,
  logOut,
  updateToken,
} from "../../utils/apiAuth";
import { getInfoAboutUser } from './userInfo'
import { AppDispatch, AppThunk } from "../../utils/types/types";

export const registerUserItemRequest = createAction(
  "REGISTER_USER_ITEM_REQUEST"
);
export const registerUserItemSuccess = createAction(
  "REGISTER_USER_ITEM_SUCCESS"
);
export const registerUserItemFailed = createAction("REGISTER_USER_ITEM_FAILED");

export const loginUserItemRequest = createAction("LOGIN_USER_ITEM_REQUEST");
export const loginUserItemSuccess = createAction("LOGIN_USER_ITEM_SUCCESS");
export const loginUserItemFailed = createAction("LOGIN_USER_ITEM_FAILED");

export const resetPasswordUserItemRequest = createAction(
  "RESET_PASSWORD_USER_ITEM_REQUEST"
);
export const resetPasswordUserItemSuccess = createAction(
  "RESET_PASSWORD_USER_ITEM_SUCCESS"
);
export const resetPasswordUserItemFailed = createAction(
  "RESET_PASSWORD_USER_ITEM_FAILED"
);

export const logOutItemRequest = createAction("LOG_OUT_ITEM_REQUEST");
export const logOutItemSuccess = createAction("LOG_OUT_ITEM_SUCCESS");
export const logOutItemFailed = createAction("LOG_OUT_ITEM_FAILED");

export const upadateUserItemRequest = createAction('UPDATE_USER_ITEM_REQUEST')
export const upadateUserItemSuccess = createAction('UPDATE_USER_ITEM_SUCCESS')
export const upadateUserItemFailed = createAction('UPDATE_USER_ITEM_FAILED')

export const forgotPassworUser = createAction("FORGOT_PASSWORD_USER");

export const signUpUser = (email: string, password: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(registerUserItemRequest());
    signUp(email, password, name)
      .then((data) => {
        if (data) {
          dispatch(registerUserItemSuccess(data));
          localStorage.setItem("refreshToken", data.refreshToken);
        } else {
          dispatch(registerUserItemFailed());
        }
      })
      .catch((err) => dispatch(registerUserItemFailed()));
  };
};

export const signInUser = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(loginUserItemRequest());
    signIn(email, password)
      .then((data) => {
        if (data && data.success) {
          dispatch(loginUserItemSuccess(data));
          localStorage.setItem("refreshToken", data.refreshToken);
        } else {
          dispatch(loginUserItemFailed());
        }
      })
      .catch((err) => {
        dispatch(loginUserItemFailed());
      });
  };
};

export const recoveryPasswordUser = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(resetPasswordUserItemRequest());
    recoveryPassword(email)
      .then((data) => {
        if (data && data.success) {
          //перенаправить пользователя
        } else {
          dispatch(resetPasswordUserItemFailed());
        }
      })
      .catch((err) => dispatch(resetPasswordUserItemFailed()));
  };
};

export const resetPasswordUser = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    resetPassword(password, token)
      .then((data) => {
        if (data && data.success) {
          console.log("good");
          //переадресация
        } else {
          dispatch(resetPasswordUserItemFailed());
        }
      })
      .catch((err) => dispatch(resetPasswordUserItemFailed()));
  };
};

export const logOutUser = (refreshToken: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(logOutItemRequest());
    logOut(refreshToken)
      .then((data) => {
        if (data && data.success) {
          dispatch(logOutItemSuccess());
          localStorage.removeItem("refreshToken");
          //переадресация
        } else {
          dispatch(logOutItemFailed());
        }
      })
      .catch((err) => dispatch(logOutItemFailed()));
  };
};

export const updateTokenUser = () => {
  return function (dispatch: AppDispatch) {
    dispatch(upadateUserItemRequest())
    updateToken().then((data) => {
      if (data && data.success) {
        dispatch(upadateUserItemSuccess(data))
      } else {
        dispatch(upadateUserItemFailed())
      }
    })
    .catch(err => dispatch(upadateUserItemFailed()))
  };
};

export const autoLogin = () => (dispatch: AppDispatch) => {
  dispatch(upadateUserItemRequest())
  updateToken().then(data => {
    if (data && data.success) {
      localStorage.setItem('refreshToken', data.refreshToken)
      dispatch(loginUserItemSuccess(data))
      dispatch(getInfoAboutUser(data.accessToken))
    } else {
      dispatch(upadateUserItemFailed())
    }
  })
  .catch(err => dispatch(upadateUserItemFailed()))
};
