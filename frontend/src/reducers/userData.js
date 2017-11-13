import {SIGNIN, SIGNOUT, SIGNUP, FETCHUSERDATA, SAVEUSERDATA, SIGNINJWT} from "../actions/type";
import utils from './../utils/utils';

export const initialState = {
	name     : false,
	data     : [],
	isLogged : false
};
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
			const {name, data} = action.payload.user;
			utils.triggerNotification('success', `Welcome ${name}!`);
			return {
				...state,
				name : name,
				data : [ ...JSON.parse(data) ]
			};
			break;
		
		case SAVEUSERDATA:
			if ( action.payload.isAuto ) {
				utils.triggerNotification('info', `Data automatically saved.`);
			} else {
				utils.triggerNotification('success', `Data saved successfully!`);
			}
			break;
		
	}
	
	return state;
	
}
