import {combineReducers} from 'redux';
import userData from './userData';
import UI from './UI';
import {reducer as forms} from 'redux-form';


const rootReducer = combineReducers({
										user : userData,
										ui   : UI,
										form : forms,
									});

export default rootReducer;
