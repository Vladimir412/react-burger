import { 
    wsConnectSuccess,
    wsConnectError,
    wsConnectClosed,
    wsGetMessage,
 } from '../actions/wsActionTypes'
 import { createReducer } from '@reduxjs/toolkit'

 type TWSState = {
    wcConnected: boolean;
    orders: any;
    error?: Event;
    total: number;
    totalToday: number;
 }


 const initialState: TWSState = {
    wcConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
 }

 export default createReducer(initialState, {
    [wsConnectSuccess.type]: (state: any) => {
        return {
            ...state,
            error: undefined,
            wcConnected: true
        }
    },
    [wsConnectError.type]: (state, action) => {
        return {
            ...state,
            error: action.payload,
            wcConnected: false
        }
    },
    [wsConnectClosed.type]: state => {
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
    default: state => state
 })