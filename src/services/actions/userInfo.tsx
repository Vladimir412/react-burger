import { createAction, PayloadAction, ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { getInfoUser, updateInfoUser, updateToken } from "../../utils/apiAuth";
import { TUserInfo } from '../../utils/types/types'

export const userInfoItemRequest = createAction("USER_INFO_ITEM_REQUEST");
export const userInfoItemSuccess = createAction<TUserInfo>("USER_INFO_ITEM_SUCCESS",);
export const userInfoItemFailed = createAction("USER_INFO_ITEM_FAILED");

export const userInfoUpdateItemRequest = createAction(
  "USER_INFO_UPDATE_ITEM_REQUEST"
);
export const userInfoUpdateItemSuccess = createAction<TUserInfo>(
  "USER_INFO_UPDATE_ITEM_SUCCESS"
);
export const userInfoUpdateItemFailed = createAction(
  "USER_INFO_UPDATE_ITEM_FAILED"
);

export const updateTokenUser = createAction("UPDATE_TOKEN");

export const getInfoAboutUser = (accessToken: string) => {
  return function (dispatch: any) {
    dispatch(userInfoItemRequest());
    getInfoUser(accessToken)
      .then((data: any) => {
        if (data && data.success) {
          dispatch(userInfoItemSuccess(data));
        } else if (data && data.message === "jwt expired") {
          updateToken().then((token: any) =>
            getInfoUser(token).then((data: any) =>
              data && data.success
                ? dispatch(userInfoItemSuccess(data))
                : dispatch(userInfoItemFailed())
            )
          );
        } else {
          dispatch(userInfoItemFailed());
        }
      })
      .catch((err) => {
        dispatch(userInfoItemFailed());
      });
  };
};

export const updateInfoAboutUser = (dataObject: any) => {
  const { name, email, password } = dataObject;
  return function (dispatch: any) {
    dispatch(userInfoUpdateItemRequest());
    updateInfoUser(dataObject)
      .then((data: any) => {
        if (data && data.success) {
          dispatch(userInfoUpdateItemSuccess(data));
        } else {
          dispatch(userInfoUpdateItemFailed());
        }
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          updateToken().then((info: any) => {
            localStorage.setItem("refreshToken", info.refreshToken);
            const newDataObject = {
              name,
              email,
              password,
              accessToken: info.accessToken,
            };
            updateInfoUser(newDataObject).then((data: any) =>
              data && data.success
                ? dispatch(userInfoUpdateItemSuccess(data))
                : dispatch(userInfoUpdateItemFailed())
            );
          });
        }
        dispatch(userInfoUpdateItemFailed());
      });
  };
};
