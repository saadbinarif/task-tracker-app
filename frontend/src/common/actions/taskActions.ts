// Action Types
export enum TaskActions {
  FETCH_ALL_TASKS = 'FETCH_ALL_TASKS',
  CREATE_TASK = 'CREATE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  CREATE_SUBTASK = 'CREATE_SUBTASK'


}


// Action Creators

export const fetchAllTasks = (tasks: ITask[]) => ({
  type: TaskActions.FETCH_ALL_TASKS,
  payload: tasks,
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
