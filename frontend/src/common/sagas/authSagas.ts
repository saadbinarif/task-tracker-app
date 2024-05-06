// authSagas.ts
import { takeLatest, call, put } from 'redux-saga/effects';
import axiosInstance from '../services/axiosInstance';
import { AuthActions, LoginSuccess, LoginFailure } from '../actions/AuthActions';
import { FormValues } from '../../pages/Signin'
import { ToastContainer, toast, } from 'react-toastify';


// interface IPayload{
//     email: string,
//     password: string
// }

function* signupUser(action:{type:string, payload:any}):any {
  try{
    const response = yield call([axiosInstance, axiosInstance.post], '/auth/signup', action.payload);
    
    
  }catch(error){

  }
}

function* loginUser(action: { type: string, payload: FormValues }) {
  try {
    const { data } = yield call([axiosInstance, axiosInstance.post], '/auth/login', action.payload);
    console.log('Login response:', data); 
    yield put(LoginSuccess(data));
    const token = data.token;
    localStorage.setItem('token', token);
    toast.success(data.message)
    
  } catch (error:any) {
    console.error('Login error:', error);
    yield put(LoginFailure(error.response.data.error));
    toast.error(error.response.data.error)
  }
}

function* watchLoginRequest() {
  yield takeLatest(AuthActions.LOGIN_REQUEST, loginUser);
}

export default function* authSagas() {
  yield watchLoginRequest();
}

