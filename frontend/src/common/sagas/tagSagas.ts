import { takeLatest, put, call } from "redux-saga/effects";
import axiosInstance from '../services/axiosInstance'
import { TagActions, createTagFailure, createTagSuccess, fetchTagFailure, fetchTagSuccess } from "../actions/tagActions";


function* fetchTags():any {
    try{
        const token = localStorage.getItem('token')

        const response = yield call (axiosInstance.get, '/tags', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        yield put(fetchTagSuccess(response.data))
        console.log("fetchTagSaga:", response.data)
    }catch(error:any){
        // yield put(fetchTagFailure(error.response))
        console.log(error)
    }

}

function* handleCreateTag(action:{type:string, payload:any}):any {
    try{
        const token = localStorage.getItem('token')
        const response = yield call(axiosInstance.post, '/tags', action.payload, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        yield put(createTagSuccess(response.data.tag))
        console.log(response.data.tag)
    }catch(error){
        // yield put(createTagFailure(error))
        console.log(error)
    }
}


export default function* TagSagas(){
    yield takeLatest(TagActions.FETCH_TAGS_REQUEST, fetchTags)
    yield takeLatest(TagActions.CREATE_TAG_REQUEST, handleCreateTag)

}