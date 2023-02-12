import reducer from './auth';
import * as types from '../actions/auth';
import {
    returnActionAndPayload
} from '../../utils/utils';

describe('auth reducer', () => {

    const state = {
        isLoading: false,
        isError: false,
        accessToken: "",
        isLogged: false,
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(state)
    })

    it('should register user request', () => {

        const action = returnActionAndPayload(types.registerUserItemRequest)

        expect(reducer(state, action)).toEqual({
            ...state,
            isError: false,
            isLoading: true,
        })
    })

    it('should register user success', () => {

        const beforeState = Object.assign(state)
        beforeState.isLoading = true
        const payload = {
            accessToken: 'sdfgndklgbildbg'
        }

        const action = returnActionAndPayload(types.registerUserItemSuccess, payload)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            accessToken: action.payload.accessToken
        })
    })

    it('should register user fail', () => {

        const beforeState = Object.assign(state)
        beforeState.isLoading = true

        const action = returnActionAndPayload(types.registerUserItemFailed)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            isError: true
        })
    })

    it('should login user request', () => {

        const action = returnActionAndPayload(types.loginUserItemRequest)

        expect(reducer(state, action)).toEqual({
            ...state,
            isError: false,
            isLoading: true,
        })
    })

    it('should login user success', () => {

        const beforeState = Object.assign(state)
        beforeState.isLoading = true
        const payload = {
            accessToken: 'sdfgndklgbildbg'
        }

        const action = returnActionAndPayload(types.loginUserItemSuccess, payload)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            isLogged: true,
            accessToken: action.payload.accessToken
        })
    })

    it('should login user fail', () => {

        const beforeState = Object.assign(state)
        beforeState.isLoading = true

        const action = returnActionAndPayload(types.loginUserItemFailed)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            isError: true
        })
    })

    it('should reset password user request', () => {

        const action = returnActionAndPayload(types.resetPasswordUserItemRequest)

        expect(reducer(state, action)).toEqual({
            ...state,
            isError: false,
            isLoading: true,
        })
    })

    it('should reset password user success', () => {

        const beforeState = Object.assign(state)
        beforeState.isLoading = true

        const action = returnActionAndPayload(types.resetPasswordUserItemSuccess)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
        })
    })

    it('should reset password user fail', () => {

        const beforeState = Object.assign(state)
        beforeState.isLoading = true

        const action = returnActionAndPayload(types.resetPasswordUserItemFailed)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            isError: true
        })
    })

    it('should forgot password', () => {

        const token = 'l;sdfijgo;du'
        const action = returnActionAndPayload(types.forgotPassworUser, token)

        expect(reducer(state, action)).toEqual({
            ...state,
            accessToken: action.token
        })
    })

    it('should log out request', () => {

        const beforeState = state
        beforeState.isLogged = true
        beforeState.accessToken = 'fdj.klgnk;d'

        const action = returnActionAndPayload(types.logOutItemRequest)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: true,
            isError: false,
        })
    })

    it('should log out success', () => {

        const beforeState = state
        beforeState.isLogged = true
        beforeState.accessToken = 'fdj.klgnk;d'
        beforeState.isLoading = true

        const action = returnActionAndPayload(types.logOutItemSuccess)

        expect(reducer(beforeState, action)).toEqual({
            isLoading: false,
            isError: false,
            isLogged: false,
            accessToken: "",
        })
    })

    it('should log out fail', () => {

        const beforeState = state
        beforeState.isLogged = true
        beforeState.accessToken = 'fdj.klgnk;d'
        beforeState.isLoading = true

        const action = returnActionAndPayload(types.logOutItemFailed)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            isError: true,
        })
    })

    it('should update user request', () => {

        const beforeState = state
        beforeState.accessToken = ';dfiogjnfo;d'

        const action = returnActionAndPayload(types.upadateUserItemRequest)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: true,
            isError: false,
        })
    })

    it('should update user success', () => {

        const beforeState = state
        beforeState.accessToken = ';dfiogjnfo;d'
        beforeState.isLoading = true

        const payload = {
            accessToken: 'fg;jlndg;l'
        }
        const action = returnActionAndPayload(types.upadateUserItemSuccess, payload)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            accessToken: action.payload.accessToken,
        })
    })

    it('should update user fail', () => {

        const beforeState = state
        beforeState.accessToken = ';dfiogjnfo;d'
        beforeState.isLoading = true

        const action = returnActionAndPayload(types.upadateUserItemFailed)

        expect(reducer(beforeState, action)).toEqual({
            ...beforeState,
            isLoading: false,
            isError: true
        })
    })
})