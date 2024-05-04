// Action Types
export enum TaskActions {
  FETCH_ALL_TASKS_REQUEST = 'FETCH_ALL_TASKS_REQUEST',
  FETCH_ALL_TASKS_SUCCESS = 'FETCH_ALL_TASKS_SUCCESS',
  FETCH_ALL_TASKS_FAILURE = 'FETCH_ALL_TASKS_FAILURE',
  CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST',
  CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS',
  CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
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


export const deleteTask = (taskId: string) => ({
  type: TaskActions.DELETE_TASK,
  payload: taskId,
});

export const updateTask = (task: ITask) => ({
  type: TaskActions.UPDATE_TASK,
  payload: task,
});

export const createSubtask = (task: ITask) => ({
  type: TaskActions.CREATE_SUBTASK
})
