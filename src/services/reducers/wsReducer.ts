import {
    wsConnectSuccess,
    wsConnectError,
    wsConnectClosed,
    wsGetMessage,
    wsGetMessageMy,
    wsSetTitle
} from '../actions/wsActionTypes'
import { createReducer } from '@reduxjs/toolkit'
import { TOrder, TGetMessage } from '../../utils/types/types'

type TWSState = {
    wsConnected: boolean;
    orders: Array<TGetMessage>;
    myOrders: Array<any>;
    error?: Event;
    total: number;
    totalToday: number;
    numberOrder: string;
}


const initialState: TWSState = {
    wsConnected: false,
    orders: [],
    myOrders: [],
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
    [wsGetMessage.type]: (state, action) => {
        return {
            ...state,
            error: undefined,
            orders: [...action.payload.orders],
            total: action.payload.total,
            totalToday: action.payload.totalToday
        }
    },
    [wsGetMessageMy.type]: (state, action) => {
        console.log(action.payload.orders);
        
        return {
            ...state,
            error: undefined,
            myOrders: [...action.payload.orders],
        }
    },
    [wsSetTitle.type]: (state, action) => {
        return {
            ...state,
            numberOrder: action.payload
        }
    },
    default: state => state
})