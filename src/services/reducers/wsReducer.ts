import { 
    wsConnectSuccess,
    wsConnectError,
    wsConnectClosed,
    wsGetMessage,
    wsSetTitle
 } from '../actions/wsActionTypes'
 import { createReducer } from '@reduxjs/toolkit'

 type TWSState = {
    wsConnected: boolean;
    orders: any;
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
    [wsConnectSuccess.type]: (state: any) => {
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
    [wsSetTitle.type]: (state, action) => {
        return {
            ...state,
            numberOrder: action.payload
        }
    },
    default: state => state
 })