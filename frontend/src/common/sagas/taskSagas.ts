import { takeLatest, put, call } from 'redux-saga/effects';
import axiosInstance from '../services/axiosInstance'
import { AxiosResponse } from 'axios';
import {
  TaskActions,
  
  createTask,
  deleteTask,
  updateTask,
  fetchAllTasksSuccess,
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

function* watchTaskFetchRequest() {
    yield takeLatest(TaskActions.FETCH_ALL_TASKS_REQUEST, handleFetchAllTasks);
  }

  export default function* TaskSagas() {
    yield watchTaskFetchRequest();
  }