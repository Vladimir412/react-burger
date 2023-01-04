import {
    userInfoItemRequest,
    userInfoItemSuccess,
    userInfoItemFailed,
    userInfoUpdateItemRequest,
    userInfoUpdateItemSuccess,
    userInfoUpdateItemFailed,
  } from '../../services/actions/userInfo'
  import { TUpdateUserItem } from './types';

export type TUserInfoItemRequest = {
    readonly type: typeof userInfoItemRequest

};

export type TUserInfoItemSuccess = {
    readonly type: typeof userInfoItemSuccess;
    payload: TUpdateUserItem;
    // payload: TUserInfo;
};

export type TUserInfoItemFailed = {
    readonly type: typeof userInfoItemFailed
};

export type TUserInfoUpdateItemRequest = {
    readonly type: typeof userInfoUpdateItemRequest
};

export type  TUserInfoUpdateItemSuccess = {
    readonly type: typeof userInfoUpdateItemSuccess;
    payload: TUpdateUserItem;
    // payload: TUserInfo;
};

export type  TUserInfoUpdateItemFailed = {
    readonly type: typeof userInfoUpdateItemFailed
};

export type TUserInfoActions = 
    | TUserInfoItemRequest
    | TUserInfoItemSuccess
    | TUserInfoItemFailed
    | TUserInfoUpdateItemRequest
    | TUserInfoUpdateItemSuccess
    | TUserInfoUpdateItemFailed