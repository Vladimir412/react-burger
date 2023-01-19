import reducer from "./userInfo";
import * as types from '../actions/userInfo';
import {
    returnActionAndPayload
} from "../../utils/utils";

describe('userInfo reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            name: "",
            email: "",
            isLoading: false,
            isError: false,
        })
    })

    it('should sent request info user', () => {
        const beforeState = {
            name: "",
            email: "",
            isLoading: false,
            isError: false,
        }

        const action = {
            type: types.userInfoItemRequest.type
        }

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: true,
            isError: false,
        })
    })

    it('should get successful user info', () => {
        const beforeState = {
            name: "",
            email: "",
            isLoading: true,
            isError: false,
        }

        const action = {
            type: types.userInfoItemSuccess.type,
            payload: {
                user: {
                    name: 'Vladimir',
                    email: 'vladmir@gmail.ru'
                }
            }
        }

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            name: action.payload.user.name,
            email: action.payload.user.email,
        })
    })

    it('should get failed user info', () => {

        const beforeState = {
            name: "",
            email: "",
            isLoading: false,
            isError: false,
        }

        const action = returnActionAndPayload(types.userInfoItemFailed)

        // const action = {
        //     type: types.userInfoItemFailed.type
        // }

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            isError: true,
        })
    })

    it('should sent request update info user', () => {
        const beforeState = {
            name: "Vladimir",
            email: "vladmir@gmail.ru",
            isLoading: false,
            isError: false,
        }

        // const action = {
        //     type: types.userInfoUpdateItemRequest.type
        // }
        const action = returnActionAndPayload(types.userInfoUpdateItemRequest)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: true,
            isError: false,
        })
    })

    it('should get successful update user info', () => {
        const beforeState = {
            name: 'Vladimir',
            email: 'vladmir@gmail.ru',
            isLoading: true,
            isError: false,
        }

        const action = {
            type: types.userInfoUpdateItemSuccess.type,
            payload: {
                user: {
                    name: 'Ivan',
                    email: 'ivan@gmail.ru'
                }
            }
        }

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            name: action.payload.user.name,
            email: action.payload.user.email,
        })
    })

    it('should get failed update user info', () => {

        const beforeState = {
            name: 'Ivan',
            email: 'ivan@gmail.ru',
            isLoading: false,
            isError: false,
        }

        const action = {
            type: types.userInfoUpdateItemFailed.type
        }

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            isError: true,
        })
    })
})