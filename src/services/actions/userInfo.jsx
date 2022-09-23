import { createAction } from "@reduxjs/toolkit";
import { getInfoUser, updateInfoUser, updateToken } from "../../utils/apiAuth";

export const userInfoItemRequest = createAction("USER_INFO_ITEM_REQUEST");
export const userInfoItemSuccess = createAction("USER_INFO_ITEM_SUCCESS");
export const userInfoItemFailed = createAction("USER_INFO_ITEM_FAILED");

export const userInfoUpdateItemRequest = createAction(
  "USER_INFO_UPDATE_ITEM_REQUEST"
);
export const userInfoUpdateItemSuccess = createAction(
  "USER_INFO_UPDATE_ITEM_SUCCESS"
);
export const userInfoUpdateItemFailed = createAction(
  "USER_INFO_UPDATE_ITEM_FAILED"
);

export const updateTokenUser = createAction("UPDATE_TOKEN");

export const getInfoAboutUser = (accessToken) => {
  return function (dispatch) {
    dispatch(userInfoItemRequest());
    getInfoUser(accessToken)
      .then((data) => {
        if (data && data.success) {
          dispatch(userInfoItemSuccess(data));
        } else if (data && data.message === "jwt expired") {
          updateToken().then((token) =>
            getInfoUser(token).then((data) =>
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

export const updateInfoAboutUser = (dataObject) => {
  const { name, email, password } = dataObject;
  return function (dispatch) {
    dispatch(userInfoUpdateItemRequest());
    updateInfoUser(dataObject)
      .then((data) => {
        if (data && data.success) {
          dispatch(userInfoUpdateItemSuccess(data));
        } else {
          dispatch(userInfoUpdateItemFailed());
        }
      })
      .catch((err) => {
        if (err.message === "jwt expired") {
          updateToken().then((info) => {
            localStorage.setItem("refreshToken", info.refreshToken);
            const newDataObject = {
              name,
              email,
              password,
              accessToken: info.accessToken,
            };
            updateInfoUser(newDataObject).then((data) =>
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
