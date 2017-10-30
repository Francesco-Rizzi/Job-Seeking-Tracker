import {SIGNIN, SIGNOUT, SIGNUP, FETCHUSERDATA, SAVEUSERDATA} from "../actions/type";
import utils from './../utils/utils';

export const initialState = {
	name : false,
	data : []
};
export default function( state = initialState, action ){
	
	switch ( action.type ) {
		
		case SIGNIN:
			break;
		
		case SIGNOUT:
			return initialState;
			break;
		
		case SIGNUP:
			utils.triggerNotification('success', `Your have successfully signed up!`);
			break;
		
		case FETCHUSERDATA:
			utils.triggerNotification('success', `Welcome ${action.payload.user.name}!`);
			return {
				...state,
				name : action.payload.user.name,
				data : [ ...action.payload.user.data ]
			};
			break;
			break;
		
		case SAVEUSERDATA:
			utils.triggerNotification('success', `Data saved successfully!`);
			break;
		
	}
	
	return state;
	
}
