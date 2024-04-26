import { Reducer } from "redux";
import { AuthActions } from "../actions/AuthActions";


interface IAuthState {
    user: IUser[];
    loading: boolean;
    error: boolean;
}

const initialState: IAuthState = {
    user: [],
    loading: false,
    error: false,
};
const PENDING = "_PENDING"
const FULFILLED = "_FULFILLED"
const REJECT = "_REJECT"

const authReducer: Reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case AuthActions.LOGIN + PENDING:
            return {
                ...state,
                loading: true

            }
        case AuthActions.LOGIN + FULFILLED:
            return {
                ...state,
                loading: false,
                user: action.payload

            }
        case AuthActions.LOGIN + REJECT:
            return {
                ...state,
                loading: false,
                error: action.payload

            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state



    }
}