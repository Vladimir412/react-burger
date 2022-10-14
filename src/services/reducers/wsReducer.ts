import { 
    wsConnectSuccess,
    wsConnectError,
    wsConnectClosed,
    wsGetMessage,
 } from '../actions/wsActionTypes'
 import { createReducer } from '@reduxjs/toolkit'

 type TWSState = {
    wcConnected: boolean;
    message: any;
    error?: Event;
 }


 const initialState: TWSState = {
    wcConnected: false,
    message: []
 }

 export default createReducer(initialState, {
    [wsConnectSuccess.type]: state => {
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
            message: [...state.message, action.payload]
        }
    },
    default: state => state
 })