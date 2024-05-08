import { FormValues } from "../../pages/Signin"

export enum AuthActions {
    VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST',
    VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS',
    VERIFY_EMAIL_FAILURE = 'VERIFY_EMAIL_FAILURE',
    SIGNUP_REQUEST = 'SIGNUP_REQUEST',
    SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
    SIGNUP_FAILURE = 'SIGNUP_FAILURE',
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGOUT = 'LOGOUT'

}

export const verifyEmailRequest = (linkToken: any): any => ({
    type: AuthActions.VERIFY_EMAIL_REQUEST,
    payload: linkToken,
});

export const verifyEmailSuccess = (linkToken: any): any => ({
    type: AuthActions.VERIFY_EMAIL_SUCCESS,
    payload: linkToken,
});
export const verifyEmailFailure= (linkToken: any): any => ({
    type: AuthActions.VERIFY_EMAIL_FAILURE,
    payload: linkToken,
});

export const SignupRequest = (data: any): any => ({
    type: AuthActions.SIGNUP_REQUEST,
    payload: data,
});

export const SignupSuccess = (data: any): any => ({
    type: AuthActions.SIGNUP_SUCCESS,
    payload: data,
});

export const SignupFailure = (error: any): any => ({
    type: AuthActions.SIGNUP_FAILURE,
    payload: error,
});

export const LoginRequest = (data: any): any => ({
    type: AuthActions.LOGIN_REQUEST,
    payload: data,

})

export const LoginSuccess = (data: any): any => ({
    type: AuthActions.LOGIN_SUCCESS,
    payload: data,

})

export const LoginFailure = (error: any): any => ({
    type: AuthActions.LOGIN_FAILURE,
    payload: error,

})

export const logoutRequest = () => ({
    type: AuthActions.LOGOUT
})