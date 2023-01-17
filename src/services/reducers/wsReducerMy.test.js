import reducer, {
    initialState
} from './wsReducerMy'
import * as types from '../actions/wsActionMyTypes'

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
        expect(reducer(initialState, {
            type: types.wsConnectSuccess.type
        })).toEqual({
            wsConnected: true,
            myOrders: [],
            total: 0,
            totalToday: 0,
        })
    })

    it('should error connection', () => {
        expect(reducer(initialState, {
            type: types.wsConnectError.type
        })).toEqual({
            wsConnected: false,
            myOrders: [],
            total: 0,
            totalToday: 0,
            //error: ???
        })
    })

    it('should closed connection', () => {
        expect(reducer(initialState, {
            type: types.wsConnectClosed.type
        })).toEqual({
            wsConnected: false,
            myOrders: [],
            total: 0,
            totalToday: 0,
            error: undefined
        })
    })

    it('should get data', () => {
        const payload = {
            orders: [{
                1: 1,
                2: 2,
                3: 3,
            },
            {
                4: 1,
                5: 2,
                6: 3,
            }],
            total: 33,
            totalToday: 9,
        }

        expect(reducer(initialState, {
            type: types.wsGetData.type,
        })).toEqual({
            wsConnected: true,
            myOrders: [...payload.orders],
            total: payload.total,
            totalToday: payload.totalToday,
        })
    })
})