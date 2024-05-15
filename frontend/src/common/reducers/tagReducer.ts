
import { Reducer } from 'redux';
import { TagActions } from "../actions/tagActions";

interface ITagState {
    tags: ITag[];
    loading: boolean;
    error: string | null;
}

const initialState: ITagState = {
    tags: [],
    loading: false,
    error: null,
};

const PENDING = "_PENDING"
const FULFILLED = "_FULFILLED"
const REJECT = "_REJECT"


const tagReducer: Reducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case TagActions.FETCH_TAGS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case TagActions.FETCH_TAGS_SUCCESS:
            return {
                ...state,
                loading: false,
                tags: action.payload,
                error: null
            };
        case TagActions.FETCH_TAGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case TagActions.CREATE_TAG_REQUEST:
            return {
                ...state,
                loading: true
            }
        case TagActions.CREATE_TAG_SUCCESS:
            return {
                ...state,
                loading: false,
                tags: [...state.tags, action.payload]
            }
        case TagActions.CREATE_TAG_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case TagActions.DELETE_TAG + PENDING:
            return {
                ...state,
                loading: true
            }
        case TagActions.DELETE_TAG + FULFILLED:
            return {
                ...state,
                loading: false,
                tags: state.tags.filter((tag: ITag) => tag._id !== action.payload)
            }
        case TagActions.DELETE_TAG + REJECT:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}

export default tagReducer;