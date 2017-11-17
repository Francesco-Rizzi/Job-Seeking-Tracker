import {
	SIGNIN,
	SIGNOUT,
	SIGNUP,
	SAVEUSERDATA,
	FETCHUSERDATA,
	FREEZE,
	DEFROST,
	SIGNINJWT,
	APPVIEWCONFIG,
	APPVIEWDATA,
	APPVIEWINSIGHTS,
	GOTOAPPVIEW,
	SETCONFIGDATA,
	CREATEJOB,
	REMOVEJOB,
	EDITJOB
} from "./type";
import utils from './../utils/utils';
import axios from 'axios';

export function signIn( email, password ){
	
	return ( dispatch ) =>{
		
		dispatch(freeze('Signing In...'));
		
		const request = axios.post('/signin', {
			email,
			password
		});
		
		Promise.all([ delay(500), request ]).then(res =>{
			
			dispatch(defrost());
			
			res = res[ 1 ];
			handleResponse(res.data, dispatch, {
				type    : SIGNIN,
				payload : {
					success : true,
					JWT     : res.data.JWT
				}
			});
			
		});
		
	};
	
}

export function signInWithJWT( JWT ){
	
	return ( dispatch ) =>{
		
		dispatch(freeze('Auto Sign In with your token...'));
		
		const request = axios.post('/signin-jwt', {
			JWT
		});
		
		Promise.all([ delay(500), request ]).then(res =>{
			
			dispatch(defrost());
			
			res = res[ 1 ];
			handleResponse(res.data, dispatch, {
				type    : SIGNINJWT,
				payload : {
					success : true
				}
			});
			
			if ( res.data.error ) {
				dispatch(signOut());
			}
			
		});
		
	};
	
}

export function signUp( name, email, password ){
	
	return ( dispatch ) =>{
		
		dispatch(freeze('Signing Up...'));
		
		const request = axios.post('/signup', {
			name,
			email,
			password
		});
		
		Promise.all([ delay(500), request ]).then(res =>{
			
			dispatch(defrost());
			
			res = res[ 1 ];
			handleResponse(res.data, dispatch, {
				type    : SIGNUP,
				payload : {
					success : true,
					JWT     : res.data.JWT
				}
			});
			
		});
		
	};
	
}


export function signOut(){
	
	utils.deleteJWT();
	
	return {
		type    : SIGNOUT,
		payload : {}
	};
	
}

export function fetchUserData(){
	
	return ( dispatch ) =>{
		
		dispatch(freeze('Fetching your data...'));
		
		const request = axios.get('/fetch-user-data', {
			params : {
				JWT : utils.getJWT()
			}
		});
		
		Promise.all([ delay(500), request ]).then(res =>{
			
			dispatch(defrost());
			
			res = res[ 1 ];
			handleResponse(res.data, dispatch, {
				type    : FETCHUSERDATA,
				payload : {user : res.data.user}
			});
			
			if ( res.data.error ) {
				dispatch(signOut());
			}
			
		});
		
	};
	
}

export function saveUserData( isAuto = true ){
	
	return ( dispatch, getState ) =>{
		
		const request = axios.post('/save-user-data', {
			JWT  : utils.getJWT(),
			data : JSON.stringify(getState().user.data)
		});
		
		request.then(res =>{
			
			handleResponse(res.data, dispatch, {
				type    : SAVEUSERDATA,
				payload : {isAuto}
			});
			if ( res.data.error ) {
				dispatch(signOut());
			}
			
		});
		
	};
	
}

export function freeze( message ){
	
	return {
		type    : FREEZE,
		payload : {message}
	};
	
}

export function defrost(){
	
	return {
		type : DEFROST
	};
	
}

export function goToAppView( view ){
	
	return {
		type    : GOTOAPPVIEW,
		payload : {view}
	};
	
}

export function setConfigValue( code, value ){
	
	return ( dispatch ) =>{
		
		dispatch({
					 type    : SETCONFIGDATA,
					 payload : {
						 code,
						 value
					 }
				 });
		
		dispatch(saveUserData());
		
	};
	
}

export function createJob( jobData ){
	
	return ( dispatch ) =>{
		
		dispatch({
					 type    : CREATEJOB,
					 payload : {jobData}
				 });
		
		dispatch(saveUserData());
		
	};
	
}

export function editJob( jobData, oldJobID ){
	
	return ( dispatch ) =>{
		
		dispatch({
					 type    : EDITJOB,
					 payload : {
						 jobData,
						 oldJobID
					 }
				 });
		
		dispatch(saveUserData());
		
	};
	
}

export function removeJob( jobID ){
	
	return ( dispatch ) =>{
		
		dispatch({
					 type    : REMOVEJOB,
					 payload : {jobID}
				 });
		
		dispatch(saveUserData());
		
	};
	
}

//UTILS

function handleResponse( res, dispatch, successAction ){
	
	if ( res.error ) {
		
		utils.triggerNotification('error', res.error);
		
	} else {
		
		dispatch(successAction);
		
	}
	
}

function delay( milliseconds ){
	
	return new Promise(( f, r ) => setTimeout(f, milliseconds));
	
}