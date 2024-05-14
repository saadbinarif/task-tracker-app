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
    case TaskActions.CREATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TaskActions.CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        loading:false
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
        loading:false
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
        loading:false
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
        loading:false,
        error: null,
        tasks: state.tasks.map((task: ITask) => {
          if (task._id === action.payload._id) {
            return {
              ...task,
              subtasks: [...task.subtasks, action.payload.subTask],
            };
          }
          return task;
        }),
      
      
      };
    case TaskActions.CREATE_SUBTASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TaskActions.DELETE_SUBTASK_REQUEST:
      return{
        ...state,
        loading: true
      }
    case TaskActions.DELETE_SUBTASK_SUCCESS:
      {console.log("dstReducer payload:", action.payload)}
      return{
        ...state,
        loading: false,
        
        tasks: state.tasks.map((task: any)=>{
          if(task._id === action.payload._id){
            return{
              ...task,
              subtasks: task.subtasks.filter((subtask: any)=> subtask._id !== action.payload.subtasks._id)
              // subtasks: [action.payload.subtasks]
            }

          }
          console.log('stateTasks',state.tasks)
          return task
        }),       
      }
      // case TaskActions.DELETE_SUBTASK_SUCCESS:
      // {console.log("dstReducer payload:", action.payload)}
      // const updatetask = state.tasks.map((task: any)=>{
      //   if(task._id === action.payload._id){
      //     return{
      //       ...task,
      //       // subtasks: task.subtasks.filter((subtask: any)=> subtask._id !== action.payload.subtasks._id)
      //       subtasks: [...action.payload.subtasks]
      //     }
      //   }
      //   // console.log('upTask', updatetask)
      //   return [...task]
      //   console.log('stateTasks',state.tasks)
      // })     
      // return{
      //   ...state,
      //   loading: false,
        
      //   tasks:  [ updatetask]
      // }
    case TaskActions.DELETE_SUBTASK_FAILURE:
    return{
      ...state,
      loading: false,
      error: action.payload
    }
    case TaskActions.UPDATE_SUBTASK_REQUEST:
      return{
        ...state,
        loading: true
      }
    // case TaskActions.UPDATE_SUBTASK_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     tasks: state.tasks.map((task: ITask) => {
    //       if (task._id === action.payload.taskId) {
    //         return {
    //           ...task,
    //           subtasks: task.subtasks.map((subtask) =>
    //             subtask._id === action.payload.subTask._id
    //               ? action.payload.subTask
    //               : subtask
    //           ),
    //         };
    //       }
    //       console.log('state.tasks------', state.tasks)
    //       return task;
    //     }),
    //   };

    case TaskActions.UPDATE_SUBTASK_SUCCESS:
      const updatedTask = state.tasks.map((task: ITask) => {
        if (task._id === action.payload.taskId) {
          return {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask._id === action.payload.subTask._id
                ? action.payload.subTask
                : subtask
            ),
          };
        }
        console.log('state.tasks------', state.tasks)
        return task;
      })
      return {
        ...state,
        loading: false,
        tasks: updatedTask
      };
 
    case TaskActions.UPDATE_SUBTASK_FAILURE:
    return{
      ...state,
      loading: false,
      error: action.payload
    }
    default:
      return state;
  }
};

export default taskReducer;
