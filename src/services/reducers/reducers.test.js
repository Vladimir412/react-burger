import reduser from './reducers';
import * as types from '../actions/actions';
import {
    returnActionAndPayload
} from '../../utils/utils';

describe('reducers reducer', () => {

    const state = {
        ingredients: [],
        ingredientsInConstructor: [],
        order: {
            success: false,
            name: "",
            order: {
                ingredients: [],
                _id: "",
                owner: {
                    name: "",
                    email: "",
                    createdAt: "",
                    updatedAt: "",
                },
                status: "",
                name: "",
                createdAt: "",
                updatedAt: "",
                number: 0,
                price: 0,
            },
        },
        isLoading: false,
        isError: false,
    }

    it('should return the initial satate', () => {

        expect(reduser(undefined, {})).toEqual(state)
    })

    it('should get ingredients request', () => {

        const action = {
            type: types.getIngredientsItemRequest,
        }

        expect(reduser(state, action)).toEqual({
            ...state,
            isError: false,
            isLoading: true,
        })
    })

    it('should get ingredients success', () => {

        const action = {
            type: types.getIngredientsItemSuccess,
            payload: [1, 2, 3]
        }

        expect(reduser(state, action)).toEqual({
            ...state,
            isLoading: false,
            ingredients: action.payload,
        })
    })

    it('should get ingredients failed', () => {

        const stateBefore = Object.assign(state)
        stateBefore.isLoading = true

        const action = returnActionAndPayload(types.getIngredientsItemError)

        expect(reduser(stateBefore, action)).toEqual({
            ...stateBefore,
            isLoading: false,
            isError: true,
        })
    })

    it('should get/update number order request', () => {

        const action = returnActionAndPayload(types.getAndUpdateNumberOrderItemRequest)

        expect(reduser(state, action)).toEqual({
            ...state,
            isError: false,
            isLoading: true,
        })
    })

    it('should get/update number order success', () => {

        const beforeState = Object.assign(state)
        beforeState.isLoading = true
        const order = {
            success: true,
            name: 'gg',
            order: {}
        }

        const action = returnActionAndPayload(types.getAndUpdateNumberOrderItemSuccess, order)

        expect(reduser(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            order: action.payload
        })
    })

    it('should get/update number order failed', () => {

        const beforeState = Object.assign(state)
        beforeState.isLoading = true

        const action = returnActionAndPayload(types.getAndUpdateNumberOrderItemError)

        expect(reduser(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            isError: true,
        })
    })
})