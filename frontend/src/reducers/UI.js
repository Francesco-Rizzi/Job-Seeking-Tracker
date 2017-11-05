import {FREEZE, DEFROST, APPVIEWCONFIG, APPVIEWDATA, APPVIEWINSIGHTS} from "../actions/type";

export const initialState = {
	isFrozen      : false,
	frozenMessage : '',
	appView       : APPVIEWDATA
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
		
		case APPVIEWDATA:
			return {
				...state,
				appView : APPVIEWDATA
			};
			break;
		
		case APPVIEWCONFIG:
			return {
				...state,
				appView : APPVIEWCONFIG
			};
			break;
		
		case APPVIEWINSIGHTS:
			return {
				...state,
				appView : APPVIEWINSIGHTS
			};
			break;
		
	}
	
	return state;
	
}
