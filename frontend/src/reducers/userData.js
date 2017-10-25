import {SIGNIN, SIGNOUT, SIGNUP, FETCHJOBS} from "../actions/type";

export const initialState = {
	logged        : false,
	name          : false,
	jobs          : [],
	isLoadingJobs : true
};
export default function( state = initialState, action ){
	
	switch ( action.type ) {
		
		case SIGNIN:
			return {
				...state,
				logged : true,
				name   : action.payload.name,
				jobs   : action.payload.jobs,
			};
			break;
		
		case SIGNOUT:
			return initialState;
			break;
		
		case SIGNUP:
			break;
		
		case FETCHJOBS:
			return {
				...state,
				isLoadingJobs : false,
				jobs          : [ ...action.payload ]
			};
			break;
		
	}
	
	return state;
	
}
