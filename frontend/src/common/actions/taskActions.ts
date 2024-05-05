// Action Types
export enum TaskActions {
  FETCH_ALL_TASKS_REQUEST = 'FETCH_ALL_TASKS_REQUEST',
  FETCH_ALL_TASKS_SUCCESS = 'FETCH_ALL_TASKS_SUCCESS',
  FETCH_ALL_TASKS_FAILURE = 'FETCH_ALL_TASKS_FAILURE',
  CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST',
  CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS',
  CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE',
  UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST',
  UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS',
  UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE',
  DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST',
  DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS',
  DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE',
  CREATE_SUBTASK = 'CREATE_SUBTASK'


}


// Action Creators

export const fetchAllTasksRequest = (): any => ({
  type: TaskActions.FETCH_ALL_TASKS_REQUEST,
  
});

export const fetchAllTasksSuccess = (tasks: ITask[]): any => ({
  type: TaskActions.FETCH_ALL_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchAllTasksFailure = (error: any): any => ({
  type: TaskActions.FETCH_ALL_TASKS_FAILURE,
  payload: error,
});


export const createTaskRequest = (task: any) => ({
  type: TaskActions.CREATE_TASK_REQUEST,
  payload: task,
});

export const createTaskSuccess = (task: ITask) => ({
  type: TaskActions.CREATE_TASK_SUCCESS,
  payload: task,
});

export const createTaskFailure = (error: any) => ({
  type: TaskActions.CREATE_TASK_FAILURE,
  payload: error,
});


export const deleteTaskRequest = (taskId: string) => ({
  type: TaskActions.DELETE_TASK_REQUEST,
  payload: taskId,
});

export const deleteTaskSuccess = (message: any) => ({
  type: TaskActions.DELETE_TASK_SUCCESS,
  payload: message,
});

export const deleteTaskFailure = (error: string) => ({
  type: TaskActions.DELETE_TASK_FAILURE,
  payload: error,
});

export const updateTaskRequest = (taskId:string, task: any) => ({
  type: TaskActions.UPDATE_TASK_REQUEST,
  payload: {taskId, task},
});

export const updateTaskSuccess = (task: ITask) => ({
  type: TaskActions.UPDATE_TASK_SUCCESS,
  payload: task,
});

export const updateTaskFailure = (task: ITask) => ({
  type: TaskActions.UPDATE_TASK_FAILURE,
  payload: task,
});

export const createSubtask = (task: ITask) => ({
  type: TaskActions.CREATE_SUBTASK
})
