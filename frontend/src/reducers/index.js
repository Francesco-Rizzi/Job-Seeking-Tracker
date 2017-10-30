import {combineReducers} from 'redux';
import userData from './userData';

const rootReducer = combineReducers({
										user : userData
									});

export default rootReducer;
