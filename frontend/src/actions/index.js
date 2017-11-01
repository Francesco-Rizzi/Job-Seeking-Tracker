import {SIGNIN, SIGNOUT, SIGNUP, SAVEUSERDATA, FETCHUSERDATA, FREEZE, DEFROST, SIGNINJWT} from "./type";
import utils from './../utils/utils';
import axios from 'axios';

export function signIn( email, password ){
	
	return ( dispatch ) =>{
		
		dispatch({
					 type    : FREEZE,
					 payload : {message : 'Signing In...'}
				 });
		
		axios.post('/signin', {
			email,
			password
		}).then(res =>{
			
			handleResponse(res.data, dispatch, {
				type    : SIGNIN,
				payload : {success : true}
			});
			
			dispatch({type : DEFROST});
			
		});
		
		
	};
	
}

export function signInWithJWT( JWT ){
	
	return ( dispatch ) =>{
		
		dispatch({
					 type    : FREEZE,
					 payload : {message : 'Auto Sign In with your token...'}
				 });
		
		axios.post('/signin-jwt', {
			JWT
		}).then(res =>{
			
			handleResponse(res.data, dispatch, {
				type    : SIGNINJWT,
				payload : {success : true}
			});
			
			dispatch({type : DEFROST});
			
		});
		
		
	};
	
}

export function signUp( name, email, password ){
	
	return ( dispatch ) =>{
		
		dispatch({
					 type    : FREEZE,
					 payload : {message : 'Signing Up...'}
				 });
		
		axios.post('/signup', {
			name,
			email,
			password
		}).then(res =>{
			
			handleResponse(res.data, dispatch, {
				type    : SIGNUP,
				payload : {success : true}
			});
			
			dispatch({type : DEFROST});
			
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
		
		dispatch({
					 type    : FREEZE,
					 payload : {message : 'Fetching your data...'}
				 });
		
		axios.post('/fetch-user-data', {
			JWT : utils.getJWT()
		}).then(res =>{
			
			handleResponse(res.data, dispatch, {
				type    : FETCHUSERDATA,
				payload : {user : res.user}
			});
			
			dispatch({type : DEFROST});
			
		});
		
	};
	
}

export function saveUserData( data, isAuto = false ){
	
	axios.post('/save-user-data', {
		JWT  : utils.getJWT(),
		data : data
	}).then(res =>{
		
		handleResponse(res, dispatch, {
			type    : SAVEUSERDATA,
			payload : {isAuto}
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