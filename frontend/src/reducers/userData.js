import {
	SIGNIN,
	SIGNOUT,
	SIGNUP,
	FETCHUSERDATA,
	SAVEUSERDATA,
	SIGNINJWT,
	SETCONFIGDATA,
	CREATEJOB,
	REMOVEJOB,
	EDITJOB,
	RESETUSERDATA
} from "../actions/type";
import utils from './../utils/utils';
import initialState from './initialUserData';
import _ from 'lodash';

export default function( state = initialState, action ){
	
	let newState, jobID, jobData;
	
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
			utils.saveJWT(action.payload.JWT);
			utils.triggerNotification('success', `Your have successfully signed up!`);
			return {
				...state,
				isLogged : true
			};
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
		
		case RESETUSERDATA:
			newState = _.cloneDeep(initialState);
			utils.triggerNotification('success', `Data reset successful!`);
			return {
				...newState,
				isLogged : true,
				name     : state.name
			};
			break;
		
		case SETCONFIGDATA:
			
			const {code, value} = action.payload;
			
			newState                            = _.cloneDeep(state);
			newState.data.configuration[ code ] = value;
			return newState;
			
			break;
		
		case CREATEJOB:
			
			newState = _.cloneDeep(state);
			
			jobData            = action.payload.jobData;
			jobData.insertedOn = +new Date();
			jobID              = utils.getJobID(jobData);
			
			newState.data.jobs[ jobID ] = jobData;
			return newState;
			
			break;
		
		case REMOVEJOB:
			
			newState = _.cloneDeep(state);
			
			jobID = action.payload.jobID;
			
			delete newState.data.jobs[ jobID ];
			return newState;
			
			break;
		
		case EDITJOB:
			
			newState = _.cloneDeep(state);
			
			jobData = action.payload.jobData;
			jobID   = utils.getJobID(jobData);
			
			delete newState.data.jobs[ action.payload.oldJobID ];
			newState.data.jobs[ jobID ] = jobData;
			
			return newState;
			
			break;
		
	}
	
	return state;
	
}
