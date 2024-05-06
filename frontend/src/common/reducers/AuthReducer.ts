import { Reducer } from "redux";
import { AuthActions } from "../actions/AuthActions";


interface IAuthState {
    AuthToken: string | null;
    loading: boolean;
    error: boolean;

}

const initialState: IAuthState = {
    AuthToken: null,
    loading: false,
    error: false,

};


const authReducer: Reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case AuthActions.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case AuthActions.SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        case AuthActions.LOGIN_REQUEST:
            return {
                ...state,
                loading: true

            }
        case AuthActions.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                AuthToken: action.payload,


            }
        case AuthActions.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                AuthToken: null,

            }
        default:
            return state



    }
}

export default authReducer