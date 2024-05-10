import { takeLatest, put, call } from 'redux-saga/effects';
import axiosInstance from '../services/axiosInstance'
import { AxiosResponse } from 'axios';
import {
  TaskActions,
  fetchAllTasksSuccess,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  deleteTaskSuccess,
  deleteTaskFailure,
  updateTaskSuccess,
  updateTaskFailure

} from '../actions/taskActions';



// Saga to handle fetching all tasks
function* handleFetchAllTasks(): any {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const response = yield call(axiosInstance.get, '/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(fetchAllTasksSuccess(response.data));
    console.log("ctsaga",response)
  } catch (error) {
    // Handle error
    console.error('Error fetching tasks:', error);

  }
}

function* handleCreateTask(action: { type: string, payload: any }): any {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const { payload } = action
    console.log('CTsaga payload:', payload)
    // Make API call to create task
    const response = yield call(axiosInstance.post, '/tasks', payload, {
      headers: {
        Authorization: `Bearer ${token}`,

      },
    });
    // Dispatch success action with created task data
    yield put(createTaskSuccess(response.data));
    console.log("createTask", response.data)

  } catch (error: any) {
    console.log(error)
    // Dispatch failure action with error message
    yield put(createTaskFailure(error.message));

  }
}

function* handleDeleteTask(action: { type: string, payload: any }): any {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const { payload: taskId } = action;

    // Make API call to delete task
    const response = yield call(axiosInstance.delete, `/tasks/${action.payload}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  });

    // Dispatch success action with message
    yield put(deleteTaskSuccess(response.data.message));
    yield put(deleteTaskFailure(response.data.message));
    console.log(response)
  } catch (error: any) {
    // Dispatch failure action with error message
    yield put(deleteTaskFailure(error.response.data.error));
    console.log('sagaError:',error)
  }
}


function* handleUpdateTask(action: { type: string, payload: any }):any {
  try {
    const token = localStorage.getItem('token'); 

    // Make API call to update task
    const response = yield call(axiosInstance.put, `/tasks/${action.payload.taskId}`, action.payload.task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Dispatch success action with updated task data
    yield put(updateTaskSuccess(response.data));
  } catch (error:any) {
    // Dispatch failure action with error message
    yield put(updateTaskFailure(error.message));
  }
}

//============watchers==============================================================================================
function* watchTaskFetchRequest() {
  yield takeLatest(TaskActions.FETCH_ALL_TASKS_REQUEST, handleFetchAllTasks);
}

function* watchCreateTaskRequest() {
  yield takeLatest(TaskActions.CREATE_TASK_REQUEST, handleCreateTask);
}

function* watchDeleteTaskRequest() {
  yield takeLatest(TaskActions.DELETE_TASK_REQUEST, handleDeleteTask);
}

function* watchUpdateTaskRequest() {
  yield takeLatest(TaskActions.UPDATE_TASK_REQUEST, handleUpdateTask);
}

export default function* TaskSagas() {
  // yield watchTaskFetchRequest();
  // yield watchCreateTaskRequest();
  yield takeLatest(TaskActions.DELETE_TASK_REQUEST, handleDeleteTask);
  yield takeLatest(TaskActions.CREATE_TASK_REQUEST, handleCreateTask);
  yield takeLatest(TaskActions.FETCH_ALL_TASKS_REQUEST, handleFetchAllTasks);
  yield takeLatest(TaskActions.UPDATE_TASK_REQUEST, handleUpdateTask);
}