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


const authReducer: Reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case AuthActions.LOGIN_REQUEST:
            return {
                ...state,
                loading: true

            }
        case AuthActions.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload

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
                user: null
            }
        default:
            return state



    }
}