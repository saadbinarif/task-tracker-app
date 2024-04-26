import { createStore} from 'redux';
import rootReducer from './common/reducers/rootReducer';

const store = createStore(rootReducer)

export default store;