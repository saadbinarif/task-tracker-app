import { createStore, combineReducers } from 'redux';
import taskReducer from './reducers/taskReducers';

const rootReducer = combineReducers({
    tasks: taskReducer,
  });