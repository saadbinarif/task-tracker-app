import { applyMiddleware, createStore} from 'redux';
import rootReducer from './common/reducers/rootReducer';
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

export default store;