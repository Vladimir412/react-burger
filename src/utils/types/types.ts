import { type } from "@testing-library/user-event/dist/type";
import PropTypes from "prop-types";
import { ReactNode } from "react";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../../index";
import { TUserInfoActions } from "./typesActionUserInfo";
import { TActionsActions } from "./typesActionsActions";
import { TActionsAuth } from "./typesAuth";
import { TWSActions } from "./typesWS";

//  Типы ингредиентов
export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  price: number;
  proteins: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  type: string;
  _id: string;
};

export type TDetailIngredient = Omit<
  TIngredient,
  "_id" | "type" | "image_mobile" | "image" | "price"
>;

export type TIngredientDetails = TIngredient & {
  id: string;
  key: string;
  withoutModal?: string;
  dragId?: string;
  index?: number;
};

export type TIngredientDetailsProps = {
  key: string;
  props: TIngredient;
};

export type TIngredientDetailsWithOut = {
  withoutModal?: string;
};

export interface IItemBurgerConstructor {
  dragId?: string;
  moveItem: (dragId: number, index: number) => void;
  index: number;
  name: string;
  price: number;
  image: string;
  _id: string;
  id: string;
  type: string;
}

export type TCardIngredient = Omit<TIngredientDetails, "withoutModal">;

// Авторизаци и т.п.

export type TRegister = {
  name: string;
  email: string;
  password: string;
};

export type TUserInfo = Omit<TRegister, "password">;

export type TResetPassword = {
  password: string;
  token: string;
};

export type TLogin = Omit<TRegister, "name">;

// Ответы с сервера

type TSuccess = {
  success: boolean;
};

export type TAccessToken = {
  accessToken: string;
}

export type TRegisterUserItemSuccess = TSuccess & TUserInfo & {
  accessToken: string;
  refreshToken: string;
}

export type TResponseGetData<T> = TSuccess & {
  data: Array<T>;
};

type TOwner = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type TOrder = {
  createdAt: string;
  ingredients: Array<TIngredient>;
  name: string;
  number: number;
  owner: TUserInfo | TOwner;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TGetAndUpdateOrders = TSuccess & {
  name: string;
  order: TOrder;
};

export type TGetMessage = Omit<TOrder, "ingredients" | "owner" | "price"> & {
  ingredients: Array<string>;
};

export type TResponseSentDataIngredients = TSuccess & {
  name: string;
  order: TOrder;
};

export type TResponseRegisterAndLogin = TSuccess & {
  user: TLogin;
  accessToken: string;
  refreshToken: string;
};

export type TUpdateUserItem = Omit<TResponseRegisterAndLogin, 'user'> & {
  user: Omit<TRegister, 'password'>
}

export type TRecoveryPasswordAndResetPasswordAndLogout = TSuccess & {
  message: string;
};

export type TGetAndUpdateInfoUser = TUserInfo &
  TSuccess & {
    message?: string;
  };

export type TUpdateToken = Omit<TResponseRegisterAndLogin, "user">;

export type TLocation = {
  state?: { from?: string };
};

export interface IReactNode {
  children: ReactNode;
}

export interface ILocationBackground {
  location?: string;
  background?: string;
}

export type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  data?: object;
  success: boolean;
  message?: string;
  headers?: Headers;
};

export interface CustomResponse extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}

export type TModal = {
  closeModal: () => void;
  title?: string | undefined;
  stateHeader: boolean;
  children: ReactNode;
};

export type TApplicationActions =
  | TUserInfoActions
  | TActionsActions
  | TActionsAuth
  | TWSActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;
