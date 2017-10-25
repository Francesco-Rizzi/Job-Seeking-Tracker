import {combineReducers} from 'redux';
import userData from './userData';

const rootReducer = combineReducers({
										userData : userData
									});

export default rootReducer;
