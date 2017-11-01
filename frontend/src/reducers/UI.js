import {FREEZE, DEFROST} from "../actions/type";

export const initialState = {
	isFrozen      : false,
	frozenMessage : ''
};
export default function( state = initialState, action ){
	
	switch ( action.type ) {
		
		case FREEZE:
			return {
				...state,
				isFrozen      : true,
				frozenMessage : action.payload.message
			};
			break;
		
		case DEFROST:
			return {
				...state,
				isFrozen : false
			};
			break;
		
	}
	
	return state;
	
}
