import { combineReducers } from "redux";
import taskReducer from "./taskReducers";
import tagReducer from "./tagReducer";
import authReducer from "./AuthReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer,
    tags: tagReducer
})

export default rootReducer;

