import { applyMiddleware, createStore} from 'redux';
import rootReducer from './common/reducers/rootReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './common/sagas/globalSagas';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // Only persist the 'auth' reducer state
  };
  
  // Wrap the root reducer with persistReducer
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  

const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);
export default store;