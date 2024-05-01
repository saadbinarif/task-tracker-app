import { FormValues } from "../../pages/Signin"

export enum AuthActions {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGOUT = 'LOGOUT'

}

export const LoginRequest = (data: any ):any =>  ({
    type: AuthActions.LOGIN_REQUEST,
    payload: data,    

})

export const LoginSuccess = (data: any ):any => ({
    type: AuthActions.LOGIN_SUCCESS,
    payload: data,    

})

export const LoginFailure = (error: any ):any => ({
    type: AuthActions.LOGIN_FAILURE,
    payload: error,    

})

export const logout = () => ({
    action: AuthActions.LOGOUT
})