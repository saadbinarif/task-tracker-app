// authSagas.ts
import { takeLatest, call, put } from 'redux-saga/effects';
import axiosInstance from '../services/axiosInstance';
import { AuthActions, LoginSuccess, LoginFailure, SignupFailure, SignupSuccess, verifyEmailSuccess, verifyEmailFailure } from '../actions/AuthActions';
import { FormValues } from '../../pages/Signin'
import { ToastContainer, toast, } from 'react-toastify';


// interface IPayload{
//     email: string,
//     password: string
// }

function* verifyEmail(action:{type:string, payload:any}):any {
  try{
    const token = localStorage.getItem('token')
    // const {linkToken} = action.payload
    // console.log('lt', action.payload)
    const response = yield call(axiosInstance.post, `/auth/verify-email/${action.payload}`);
    if(!token){
      yield put(verifyEmailSuccess(response.data.token))
      localStorage.setItem('token', response.data.token)
      console.log('sagatoken', response.data.token)
      toast.success(response.data.message)
    }
    else if(token){
      toast.success(response.data.message)
    }
    
  }catch(error:any){
    yield put(verifyEmailFailure(error.response.data.success));
    console.log(error.response.data.success)
    if(error.response.data.success === true){

      toast.success(error.response.data.message)
    }else{
      toast.error(error.response.data.message)

    }
  }
}

function* signupUser(action:{type:string, payload:any}):any {
  try{
    const response = yield call([axiosInstance, axiosInstance.post], '/auth/signup', action.payload);
    // const response = yield call([axiosInstance, axiosInstance.post], '/auth/signup', action.payload);
    // console.log(response)
    console.log(response.data.message)
    toast.success(response.data.message)
    
  }catch(error:any){
    yield put(SignupFailure(error.response.data.message));
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
    toast.error(error.response.data.message)
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
  yield takeLatest(AuthActions.VERIFY_EMAIL_REQUEST, verifyEmail);
}

