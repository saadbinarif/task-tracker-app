import { Reducer } from 'redux'
import {
  TaskActions
} from "../actions/taskActions";


interface ITaskState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
}

const initialState: ITaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const PENDING = "_PENDING"
const FULFILLED = "_FULFILLED"
const REJECT = "_REJECT"

// Task Reducer
const taskReducer: Reducer = (state = initialState, action: IAction): ITaskState => {
  switch (action.type) {
    case TaskActions.FETCH_ALL_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TaskActions.FETCH_ALL_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };
    case TaskActions.FETCH_ALL_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TaskActions.CREATE_TASK + PENDING:
      return {
        ...state,
        loading: true,
      };
    case TaskActions.CREATE_TASK + FULFILLED:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case TaskActions.CREATE_TASK + REJECT:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TaskActions.DELETE_TASK + PENDING:
      return {
        ...state,
        loading: true,
      };
    case TaskActions.DELETE_TASK + FULFILLED:
      return {
        ...state,
        tasks: state.tasks.filter((task: ITask) => task._id !== action.payload),
      };
    case TaskActions.DELETE_TASK + REJECT:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TaskActions.UPDATE_TASK + PENDING:
      return {
        ...state,
        loading: true,
      };
    case TaskActions.UPDATE_TASK + FULFILLED:
      return {
        ...state,
        tasks: state.tasks.map((task: ITask) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case TaskActions.UPDATE_TASK + REJECT:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
