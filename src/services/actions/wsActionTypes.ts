import { createAction } from "@reduxjs/toolkit";
import { TWSActions } from '../../utils/types/typesWS'
import { TGetMessage } from "../../utils/types/types";

export const wsConnectStart = createAction<{name: string; token?: string | undefined},'WS_CONNECTION_START'>('WS_CONNECTION_START')
export const wsConnectSuccess = createAction('WS_CONNECTION_SUCCESS')
export const wsConnectError = createAction<Event,'WS_CONNECTION_ERROR'>('WS_CONNECTION_ERROR')
export const wsConnectClosed = createAction('WS_CONNECTION_CLOSED')
export const wsGetMessage = createAction<TGetMessage, 'WS_GET_MESSAGE'>('WS_GET_MESSAGE')
export const wsGetMessageMy = createAction<TGetMessage, 'WS_GET_MESSAGE_MY'>('WS_GET_MESSAGE_MY')
export const wsSendMessage = createAction<'WS_SEND_MESSAGE'>('WS_SEND_MESSAGE')
export const wsSetTitle = createAction<string, "WS_SET_TITLE">("WS_SET_TITLE")

