import { wsConnectSuccess, wsConnectError, wsConnectClosed, wsGetData } from '../actions/wsActionMyTypes';
import { createReducer } from '@reduxjs/toolkit'
import { TOrder, TGetMessage } from '../../utils/types/types'

type TWSState = {
    wsConnected: boolean;
    myOrders: Array<TGetMessage>;
    error?: Event;
    total: number;
    totalToday: number;
}


const initialState: TWSState = {
    wsConnected: false,
    myOrders: [],
    total: 0,
    totalToday: 0,
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
            myOrders: [...action.payload.orders],
            total: action.payload.total,
            totalToday: action.payload.totalToday
        }
    },
    default: state => state
})