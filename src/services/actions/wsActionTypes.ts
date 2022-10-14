import { createAction } from "@reduxjs/toolkit";

export const wsConnectStart = createAction('WS_CONNECTION_START')
export const wsConnectSuccess = createAction('WS_CONNECTION_SUCCESS')
export const wsConnectError = createAction('WS_CONNECTION_ERROR')
export const wsConnectClosed = createAction('WS_CONNECTION_CLOSED')
export const wsGetMessage = createAction('WS_GET_MESSAGE')
export const wsSendMessage = createAction('WS_SEND_MESSAGE')


