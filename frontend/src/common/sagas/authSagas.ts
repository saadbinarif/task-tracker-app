// authSagas.ts
import { takeLatest, call, put } from 'redux-saga/effects';
import axiosInstance from '../services/axiosInstance';
import { AuthActions, LoginSuccess, LoginFailure, SignupFailure, SignupSuccess } from '../actions/AuthActions';
import { FormValues } from '../../pages/Signin'
import { ToastContainer, toast, } from 'react-toastify';


// interface IPayload{
//     email: string,
//     password: string
// }

function* signupUser(action:{type:string, payload:any}):any {
  try{
    const response = yield call([axiosInstance, axiosInstance.post], '/auth/signup', action.payload);
    // const response = yield call([axiosInstance, axiosInstance.post], '/auth/signup', action.payload);
    // console.log(response)
    console.log(response.data.message)
    toast.success(response.data.message)
    
  }catch(error:any){
    yield put(SignupFailure(error.response.data.error));
    console.log(error)
    toast.error(error.response.data.error)
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

function* watchSignupRequest() {
  yield takeLatest(AuthActions.SIGNUP_REQUEST, signupUser);
}

export default function* authSagas() {
  // yield watchLoginRequest();
  // yield watchSignupRequest()
  yield takeLatest(AuthActions.SIGNUP_REQUEST, signupUser);
  yield takeLatest(AuthActions.LOGIN_REQUEST, loginUser);
}

