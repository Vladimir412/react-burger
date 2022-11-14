import { createAction } from "@reduxjs/toolkit";

export const wsConnectStart = createAction<any, 'WS_CONNECTION_START'>('WS_CONNECTION_START')
export const wsConnectSuccess = createAction('WS_CONNECTION_SUCCESS')
export const wsConnectError = createAction<any, 'WS_CONNECTION_ERROR'>('WS_CONNECTION_ERROR')
export const wsConnectClosed = createAction('WS_CONNECTION_CLOSED')
export const wsGetMessage = createAction<any, 'WS_GET_MESSAGE'>('WS_GET_MESSAGE')
export const wsGetMessageMy = createAction<any, 'WS_GET_MESSAGE_MY'>('WS_GET_MESSAGE_MY')
export const wsSendMessage = createAction<any, 'WS_SEND_MESSAGE'>('WS_SEND_MESSAGE')
export const wsSetTitle = createAction<string, "WS_SET_TITLE">("WS_SET_TITLE")

