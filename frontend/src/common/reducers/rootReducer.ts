import { combineReducers } from "redux";
import taskReducer from "./taskReducers";
import tagReducer from "./tagReducer";

const rootReducer = combineReducers({
    tasks: taskReducer,
    tags: tagReducer
})

export default rootReducer;

