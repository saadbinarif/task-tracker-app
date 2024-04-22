import { Task } from "../../types/types"; 

// Action Types
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';

// Action Creators
export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasks: Task[]) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailure = (error: string) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});


export const createTaskRequest = (taskData: Task) => ({
    type: CREATE_TASK_REQUEST,
    payload: taskData,
  });
  
  export const createTaskSuccess = (task: Task) => ({
    type: CREATE_TASK_SUCCESS,
    payload: task,
  });
  
  export const createTaskFailure = (error: string) => ({
    type: CREATE_TASK_FAILURE,
    payload: error,
  });
  
  export const deleteTaskRequest = (taskId: string) => ({
    type: DELETE_TASK_REQUEST,
    payload: taskId,
  });
  
  export const deleteTaskSuccess = (taskId: string) => ({
    type: DELETE_TASK_SUCCESS,
    payload: taskId,
  });
  
  export const deleteTaskFailure = (error: string) => ({
    type: DELETE_TASK_FAILURE,
    payload: error,
  });
  
  export const updateTaskRequest = (taskData: Task) => ({
    type: UPDATE_TASK_REQUEST,
    payload: taskData,
  });
  
  export const updateTaskSuccess = (task: Task) => ({
    type: UPDATE_TASK_SUCCESS,
    payload: task,
  });
  
  export const updateTaskFailure = (error: string) => ({
    type: UPDATE_TASK_FAILURE,
    payload: error,
  });