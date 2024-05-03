// Action Types
export enum TaskActions {
  FETCH_ALL_TASKS_REQUEST = 'FETCH_ALL_TASKS_REQUEST',
  FETCH_ALL_TASKS_SUCCESS = 'FETCH_ALL_TASKS_SUCCESS',
  FETCH_ALL_TASKS_FAILURE = 'FETCH_ALL_TASKS_FAILURE',
  CREATE_TASK = 'CREATE_TASK',
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


export const createTask = (task: ITask) => ({
  type: TaskActions.CREATE_TASK,
  payload: task,
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
