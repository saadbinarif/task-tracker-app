
import { all } from 'redux-saga/effects';
import authSagas from './authSagas';
import TaskSagas from './taskSagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    TaskSagas(),
    
  ]);
}
