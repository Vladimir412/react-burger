import { TypeOfExpression } from 'typescript'
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
} from '../../services/actions/auth'


type TRegisterUserItemRequest = {
    type: typeof registerUserItemRequest;
}

type TRegisterUserItemSuccess = {
    type: typeof registerUserItemSuccess;
    payload: any;
    // payload: string;
}

type TRegisterUserItemFailed = {
    type: typeof registerUserItemFailed;
}

type TLoginUserItemRequest = {
    type: typeof loginUserItemRequest;
}

type TLoginUserItemSuccess = {
    type: typeof loginUserItemSuccess;
    payload: any;
    // payload: string;
}

type TLoginUserItemFailed = {
    type: typeof loginUserItemFailed;
}

type TResetPasswordUserItemRequest = {
    type: typeof resetPasswordUserItemRequest;
}

type TResetPasswordUserItemSuccess = {
    type: typeof resetPasswordUserItemSuccess;
}

type TResetPasswordUserItemFailed = {
    type: typeof resetPasswordUserItemFailed;
}

type TForgotPassworUser = {
    type: typeof forgotPassworUser;
    payload: any;
    // payload: string;
}

type TLogOutItemRequest = {
    type: typeof logOutItemRequest;
}

type TLogOutItemSuccess = {
    type: typeof logOutItemSuccess;
    payload: any;
    // payload: string;
}

type TLogOutItemFailed = {
    type: typeof logOutItemFailed;
}

type TUpadateUserItemRequest = {
    type: typeof upadateUserItemRequest;
}

type TUpadateUserItemSuccess = {
    type: typeof upadateUserItemSuccess;
    payload: any;
    // payload: string;
}

type TUpadateUserItemFailed = {
    type: typeof upadateUserItemFailed;
    payload: any;
    // payload: string;
}

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
    | TForgotPassworUser