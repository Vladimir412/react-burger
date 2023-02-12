import reducer from './wsReducerMy'
import * as types from '../actions/wsActionMyTypes';
import {
    returnActionAndPayload
} from '../../utils/utils';

describe('wsReduserMy reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            wsConnected: false,
            myOrders: [],
            total: 0,
            totalToday: 0,
        })
    })

    it('should successful connection', () => {

        const beforeState = {
            wsConnected: false,
            myOrders: [],
            total: 0,
            totalToday: 0,
        }

        const action = returnActionAndPayload(types.wsConnectSuccess)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            error: undefined,
            wsConnected: true,
        })
    })

    it('should get data', () => {

        const stateBefore = {
            wsConnected: true,
            myOrders: [],
            total: 0,
            totalToday: 0,
        }

        const payload = {
            orders: [1, 2, 3],
            total: 1,
            totalToday: 2,
        }

        const action = returnActionAndPayload(types.wsGetData, payload)

        expect(reducer(stateBefore, action)).toEqual({
            ...stateBefore,
            myOrders: [...action.payload.orders],
            total: action.payload.total,
            totalToday: action.payload.totalToday,
            error: undefined
        })
    })

    it('should error connection', () => {
        const beforeState = {
            wsConnected: true,
            myOrders: [],
            total: 0,
            totalToday: 0,
        }

        const action = {
            type: types.wsConnectError.type,
            payload: "error"
        }
        expect(reducer(beforeState, action)).toEqual({
            wsConnected: false,
            myOrders: [],
            total: 0,
            totalToday: 0,
            error: action.payload
        })
    })

    it('should closed connection', () => {

        const beforeState = {
            wsConnected: true,
            myOrders: [1, 2, 3],
            total: 33,
            totalToday: 2,
        }

        const action = returnActionAndPayload(types.wsConnectClosed)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            wsConnected: false,
            error: undefined
        })
    })
})