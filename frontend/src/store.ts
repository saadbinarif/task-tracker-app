import { applyMiddleware, createStore} from 'redux';
import rootReducer from './common/reducers/rootReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './common/sagas/globalSagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
export default store;