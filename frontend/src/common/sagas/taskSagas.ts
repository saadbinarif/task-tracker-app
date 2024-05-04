import { takeLatest, put, call } from 'redux-saga/effects';
import axiosInstance from '../services/axiosInstance'
import { AxiosResponse } from 'axios';
import {
  TaskActions,
  fetchAllTasksSuccess,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  deleteTask,
  updateTask,
} from '../actions/taskActions';



// Saga to handle fetching all tasks
function* handleFetchAllTasks():any {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const response = yield call(axiosInstance.get, '/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    yield put(fetchAllTasksSuccess(response.data));
    console.log(response.data)
  } catch (error) {
    // Handle error
    console.error('Error fetching tasks:', error);
   
  }
}

function* handleCreateTask(action: { type: string, payload: any }): any {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    const {payload} = action
    console.log('CTsaga payload:', payload)
    // Make API call to create task
    const response = yield call(axiosInstance.post, '/tasks', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    });
    // Dispatch success action with created task data
    yield put(createTaskSuccess(response.data));
    console.log("createTask",response.data)

  } catch (error: any) {
    console.log(error.message)
    // Dispatch failure action with error message
    yield put(createTaskFailure(error.message));
    
  }
}



function* watchTaskFetchRequest() {
    yield takeLatest(TaskActions.FETCH_ALL_TASKS_REQUEST, handleFetchAllTasks);
  }

  function* watchCreateTaskRequest() {
    yield takeLatest(TaskActions.CREATE_TASK_REQUEST, handleCreateTask);
  }

  export default function* TaskSagas() {
    // yield watchTaskFetchRequest();
    // yield watchCreateTaskRequest();
    yield takeLatest(TaskActions.CREATE_TASK_REQUEST, handleCreateTask);
    yield takeLatest(TaskActions.FETCH_ALL_TASKS_REQUEST, handleFetchAllTasks);
  }