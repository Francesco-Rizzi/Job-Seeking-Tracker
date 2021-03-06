import {FREEZE, DEFROST, APPVIEWDATA, GOTOAPPVIEW, SIGNOUT, SHOWJOBFORM, HIDEJOBFORM} from "../actions/type";

export const initialState = {
	isFrozen            : false,
	frozenMessage       : '',
	appView             : APPVIEWDATA,
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
		
		case GOTOAPPVIEW:
			return {
				...state,
				appView : action.payload.view
			};
			break;
		
		case SHOWJOBFORM:
			return {
				...state,
				appIsJobFormVisible : true,
			};
			break;
			
	}
	
	return state;
	
}
