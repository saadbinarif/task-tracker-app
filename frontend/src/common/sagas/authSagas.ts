// authSagas.ts
import { takeLatest, call, put } from 'redux-saga/effects';
import axiosInstance from '../services/axiosInstance';
import { AuthActions, LoginSuccess, LoginFailure } from '../actions/AuthActions';
import { FormValues } from '../../pages/Signin'
interface IPayload{
    email: string,
    password: string
}

function* loginUser(action: { type: string, payload: FormValues }) {
  try {
    const { data } = yield call([axiosInstance, axiosInstance.post], '/auth/login', action.payload);
    console.log('Login response:', data); 
    // Assuming your login API endpoint is '/login' and it returns user data upon successful login
    yield put(LoginSuccess(data));
  } catch (error:any) {
    console.error('Login error:', error);
    yield put(LoginFailure(error.message));
  }
}

function* watchLoginRequest() {
  yield takeLatest(AuthActions.LOGIN_REQUEST, loginUser);
}

export default function* authSagas() {
  yield watchLoginRequest();
}
