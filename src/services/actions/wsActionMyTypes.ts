import { createAction } from "@reduxjs/toolkit";
import { TGetMessage } from "../../utils/types/types";

export const wsConnectStart = createAction<string,'WS_CONNECTION_START_MY_DATA'>('WS_CONNECTION_START_MY_DATA')
export const wsConnectSuccess = createAction('WS_CONNECTION_SUCCESS_MY_DATA')
export const wsConnectError = createAction<Event,'WS_CONNECTION_ERROR_MY_DATA'>('WS_CONNECTION_ERROR_MY_DATA')
export const wsConnectClosed = createAction('WS_CONNECTION_CLOSED_MY_DATA')
export const wsGetData = createAction<TGetMessage, "WS_GET_DATA_MY_DATA">("WS_GET_DATA_MY_DATA")
export const wsSendData = createAction<"WS_SEND_DATA">("WS_SEND_DATA_MY_DATA")

export const wsActionMyTypes = {
    wsConnectStart,
    wsConnectSuccess,
    wsConnectError,
    wsConnectClosed,
    wsGetData,
    wsSendData,
}