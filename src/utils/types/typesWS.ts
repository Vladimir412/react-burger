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
}

type TWSConnectedSuccess = {
    type: typeof wsConnectStart;
}

type TWSConnectedError = {
    type: typeof wsConnectStart;
    payload: any;
}

type TWSConnectedClosed = {
    type: typeof wsConnectStart;
}

type TWSConnectedGetMessage = {
    type: typeof wsConnectStart;
    payload: any;
}

type TWSConnectedSendMessage = {
    type: typeof wsConnectStart;
    payload: any;
}

export type TWSActions =
    | TWSConnectedStart
    | TWSConnectedSuccess
    | TWSConnectedError
    | TWSConnectedClosed
    | TWSConnectedGetMessage
    | TWSConnectedSendMessage
