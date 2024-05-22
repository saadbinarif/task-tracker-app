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
    case TaskActions.CREATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TaskActions.CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading: false
      };
    case TaskActions.CREATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TaskActions.DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TaskActions.DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task: ITask) => task._id !== action.payload._id),
        // tasks: state.tasks.map((task: ITask) =>
        //   task._id === action.payload._id ? action.payload : task
        // ),
        loading: false
      };
    case TaskActions.DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TaskActions.UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TaskActions.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task: ITask) =>
          task._id === action.payload._id ? action.payload : task
        ),
        loading: false
      };
    case TaskActions.UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TaskActions.CREATE_SUBTASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TaskActions.CREATE_SUBTASK_SUCCESS:
      return {
        loading: false,
        error: null,
        tasks: state.tasks.map((task: ITask) =>
          task._id === action.payload._id ? action.payload : task
        ),


      };
    case TaskActions.CREATE_SUBTASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TaskActions.DELETE_SUBTASK_REQUEST:
      return {
        ...state,
        loading: true
      }
    case TaskActions.DELETE_SUBTASK_SUCCESS:
      { console.log("dstReducer payload:", action.payload) }
      return {
        ...state,
        loading: false,

        tasks: state.tasks.map((task: any) =>
          task._id === action.payload._id ? action.payload : task

        ),
      }
    case TaskActions.DELETE_SUBTASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case TaskActions.UPDATE_SUBTASK_REQUEST:
      return {
        ...state,
        loading: true
      }

    case TaskActions.UPDATE_SUBTASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map((task: any) =>
          task._id === action.payload._id ? action.payload : task
        )
      }

    case TaskActions.UPDATE_SUBTASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case TaskActions.ADD_TAG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TaskActions.ADD_TAG_SUCCESS:
      console.log('PayloadATAG', action.payload)
      return {
        loading: false,
        error: null,
        tasks: state.tasks.map((task: ITask) => (
          task._id === action.payload._id ? action.payload : task
        )),


      };

    case TaskActions.ADD_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TaskActions.REMOVE_TAG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TaskActions.REMOVE_TAG_SUCCESS:
      console.log('PayloadATAG', action.payload)
      return {
        loading: false,
        error: null,
        tasks: state.tasks.map((task: ITask) => (
          task._id === action.payload._id ? action.payload : task
        )),


      };

    case TaskActions.REMOVE_TAG_FAILURE:
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
