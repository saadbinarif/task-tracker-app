
import { all } from 'redux-saga/effects';
import authSagas from './authSagas';
import TaskSagas from './taskSagas';
import TagSagas from './tagSagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    TaskSagas(),
    TagSagas(),
    
  ]);
}
