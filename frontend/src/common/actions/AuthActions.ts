export enum AuthActions {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT'

}

const setToken = (token: string) => ({
    action: AuthActions.LOGIN,
    payload: token

})

const logout = () => ({
    action: AuthActions.LOGOUT
})