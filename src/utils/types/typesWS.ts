import {
    wsConnectStart,
    wsConnectSuccess,
    wsConnectError,
    wsConnectClosed,
    wsGetMessage,
    wsSendMessage
} from '../../services/actions/wsActionTypes'

type TWSConnectedStart = {
    type: typeof wsConnectStart;
    payload: string;
}

type TWSConnectedSuccess = {
    type: typeof wsConnectSuccess;
}

type TWSConnectedError = {
    type: typeof wsConnectError;
    payload: any;
}

type TWSConnectedClosed = {
    type: typeof wsConnectClosed;
}

type TWSConnectedGetMessage = {
    type: typeof wsGetMessage;
    payload: any;
}

type TWSConnectedSendMessage = {
    type: typeof wsSendMessage;
    payload: any;
}

export type TWSActions =
    | TWSConnectedStart
    | TWSConnectedSuccess
    | TWSConnectedError
    | TWSConnectedClosed
    | TWSConnectedGetMessage
    | TWSConnectedSendMessage
