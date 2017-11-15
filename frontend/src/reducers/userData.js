import {SIGNIN, SIGNOUT, SIGNUP, FETCHUSERDATA, SAVEUSERDATA, SIGNINJWT, SETCONFIGDATA} from "../actions/type";
import utils from './../utils/utils';
import initialState from './initialUserData';
import _ from 'lodash';

export default function( state = initialState, action ){
	
	switch ( action.type ) {
		
		case SIGNIN:
			utils.saveJWT(action.payload.JWT);
			return {
				...state,
				isLogged : true
			};
			break;
		
		case SIGNINJWT:
			
			return {
				...state,
				isLogged : true
			};
			break;
		
		case SIGNOUT:
			return initialState;
			break;
		
		case SIGNUP:
			return {
				...state,
				isLogged : true
			};
			utils.saveJWT(action.payload.JWT);
			utils.triggerNotification('success', `Your have successfully signed up!`);
			break;
		
		case FETCHUSERDATA:
			
			let {name, data} = action.payload.user;
			
			data = JSON.parse(data);
			data = data.configuration ? data : initialState.data;
			
			utils.triggerNotification('success', `Welcome ${name}!`);
			return {
				...state,
				name : name,
				data : {...data}
			};
			break;
		
		case SAVEUSERDATA:
			//Now the save is on the user actions, thus no notification required
			/*if ( action.payload.isAuto ) {
				utils.triggerNotification('info', `Data automatically saved.`);
			} else {
				utils.triggerNotification('success', `Data saved successfully!`);
			}*/
			break;
		
		case SETCONFIGDATA:
			let newState        = _.cloneDeep(state);
			const {code, value} = action.payload;
			
			newState.data.configuration[ code ] = value;
			return newState;
			
			break;
		
	}
	
	return state;
	
}
