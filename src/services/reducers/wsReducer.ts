import {
    wsConnectSuccess,
    wsConnectError,
    wsConnectClosed,
    wsGetData,
} from '../actions/wsActionTypes'
import { createReducer } from '@reduxjs/toolkit'
import { TGetMessage } from '../../utils/types/types'

type TWSState = {
    wsConnected: boolean;
    orders: Array<TGetMessage>;
    error?: Event;
    total: number;
    totalToday: number;
    numberOrder: string;
}


const initialState: TWSState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    numberOrder: "",
}

export default createReducer(initialState, {
    [wsConnectSuccess.type]: (state) => {
        return {
            ...state,
            error: undefined,
            wsConnected: true
        }
    },
    [wsConnectError.type]: (state, action) => {
        return {
            ...state,
            error: action.payload,
            wsConnected: false
        }
    },
    [wsConnectClosed.type]: (state) => {
        return {
            ...state,
            error: undefined,
            wsConnected: false
        }
    },
    [wsGetData.type]: (state, action) => {
        return {
            ...state,
            error: undefined,
            orders: [...action.payload.orders],
            total: action.payload.total,
            totalToday: action.payload.totalToday
        }
    },
    default: state => state
})