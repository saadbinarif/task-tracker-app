import { combineReducers } from "redux";
import taskReducer from "./taskReducers";
import tagReducer from "./tagReducer";

export const rootReducer = {
    tasks: taskReducer,
    tags: tagReducer
}