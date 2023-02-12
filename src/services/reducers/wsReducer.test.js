import reducer from './wsReducer'
import * as types from '../actions/wsActionTypes'
import {
    returnActionAndPayload
} from '../../utils/utils'

describe('wsReduser reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            wsConnected: false,
            orders: [],
            total: 0,
            totalToday: 0,
            numberOrder: "",
        })
    })

    it('should successful connection', () => {

        const beforeState = {
            wsConnected: false,
            orders: [],
            total: 0,
            totalToday: 0,
            numberOrder: "",
        }

        const action = returnActionAndPayload(types.wsConnectSuccess)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            wsConnected: true,
            error: undefined,
        })
    })

    it('should get data', () => {

        const beforeState = {
            wsConnected: true,
            orders: [],
            total: 0,
            totalToday: 0,
            numberOrder: "",
        }

        const payload = {
            orders: [1, 2, 3],
            total: 645,
            totalToday: 51,
        }

        const action = returnActionAndPayload(types.wsGetData, payload)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            error: undefined,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday,
        })
    })

    it('should error connection', () => {

        const beforeState = {
            wsConnected: true,
            orders: [],
            total: 0,
            totalToday: 0,
            numberOrder: "",
        }

        const action = {
            type: types.wsConnectError.type,
            payload: "error"
        }

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            error: action.payload,
            wsConnected: false,
        })
    })

    it('should closed connection', () => {

        const beforeState = {
            wsConnected: true,
            orders: [1, 2, 3],
            total: 645,
            totalToday: 51,
            numberOrder: "",
        }

        const action = returnActionAndPayload(types.wsConnectClosed)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            error: undefined,
            wsConnected: false,
        })
    })
})