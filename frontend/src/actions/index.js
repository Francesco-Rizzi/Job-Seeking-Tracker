import {SIGNIN, SIGNOUT, SIGNUP, SAVEUSERDATA, FETCHUSERDATA} from "./type";
import utils from './../utils/utils';

export function signIn( email, password ){
	
	axios.post('/signin', {
		email,
		password
	}).then(res =>{
		
		handleResponse(res, dispatch, {
			type    : SIGNIN,
			payload : {success : true}
		});
		
	});
	
}

export function signUp( name, email, password ){
	
	axios.post('/signup', {
		name,
		email,
		password
	}).then(res =>{
		
		handleResponse(res, dispatch, {
			type    : SIGNUP,
			payload : {success : true}
		});
		
	});
	
}


export function signOut(){
	
	utils.deleteJWT();
	
	return {
		type    : SIGNOUT,
		payload : {}
	};
	
}

export function fetchUserData(){
	
	axios.post('/fetch-user-data', {
		JWT : utils.getJWT()
	}).then(res =>{
		
		handleResponse(res, dispatch, {
			type    : FETCHUSERDATA,
			payload : {user : res.user}
		});
		
	});
	
}

export function saveUserData( data ){
	
	axios.post('/save-user-data', {
		JWT  : utils.getJWT()
		data : data
	}).then(res =>{
		
		handleResponse(res, dispatch, {
			type    : SAVEUSERDATA,
			payload : {}
		});
		
	});
	
}

function handleResponse( res, dispatch, successAction ){
	
	if ( res.error ) {
		
		utils.triggerNotification('error', res.error);
		
	} else {
		
		dispatch(successAction);
		
	}
	
}