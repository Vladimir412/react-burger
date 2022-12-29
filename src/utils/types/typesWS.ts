import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { type } from 'os';
import {
    wsConnectStart,
    wsConnectSuccess,
    wsConnectError,
    wsConnectClosed,
    wsGetData,
    wsSendData,
    wsGetMessage,
    wsSendMessage
} from '../../services/actions/wsActionTypes'

import { TGetMessage, TOrder } from '../types/types'

export type TWSConnectedStart = {
    type: typeof wsConnectStart;
    // name?: string;
    // token?: string
    payload?: string;
}

type TWSConnectedSuccess = {
    type: typeof wsConnectSuccess;
}

type TWSConnectedError = {
    type: typeof wsConnectError;
    payload: Event;
}

type TWSConnectedClosed = {
    type: typeof wsConnectClosed;
}

type TWSGetData = {
    type: typeof wsGetData;
    payload: TOrder
}

type TWSSendData = {
    type: typeof wsSendData
}

export type TWSActions = 
    // TWSConnectedStart: TWSConnectedStart,
    // TWSConnectedSuccess: TWSConnectedSuccess,
    // TWSConnectedError: TWSConnectedError,
    // TWSConnectedClosed: TWSConnectedClosed,
    // TWSGetData: TWSGetData,
    // TWSSendData: TWSSendData,
    | TWSConnectedStart
    | TWSConnectedSuccess
    | TWSConnectedError
    | TWSConnectedClosed
    | TWSGetData
    | TWSSendData
    // | TWSConnectedGetMessage
    // | TWSConnectedSendMessage
export type TWSActionTypes = {
    wsConnectStart: ActionCreatorWithPayload<string>,
    wsConnectSuccess: ActionCreatorWithoutPayload,
    wsConnectError: ActionCreatorWithPayload<Event>,
    wsConnectClosed: ActionCreatorWithoutPayload,
    wsGetData: ActionCreatorWithPayload<TGetMessage>,
    wsSendData: ActionCreatorWithoutPayload,
}