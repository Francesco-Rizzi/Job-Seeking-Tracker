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
	APPVIEWINSIGHTS
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
		
		Promise.all([ delay(500), request ])
			.then(res =>{
				
				res = res[ 1 ];
				handleResponse(res.data, dispatch, {
					type    : SIGNIN,
					payload : {
						success : true,
						JWT     : res.data.JWT
					}
				});
				
				dispatch(defrost());
				
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
			
			res = res[ 1 ];
			handleResponse(res.data, dispatch, {
				type    : SIGNINJWT,
				payload : {
					success : true
				}
			});
			
			dispatch(defrost());
			
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
			
			res = res[ 1 ];
			handleResponse(res.data, dispatch, {
				type    : SIGNUP,
				payload : {
					success : true,
					JWT     : res.data.JWT
				}
			});
			
			dispatch(defrost());
			
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
			JWT : utils.getJWT()
		});
		
		Promise.all([ delay(500), request ]).then(res =>{
			
			res = res[ 1 ];
			handleResponse(res.data, dispatch, {
				type    : FETCHUSERDATA,
				payload : {user : res.user}
			});
			
			dispatch(defrost());
			
		});
		
	};
	
}

export function saveUserData( data, isAuto = false ){
	
	const request = axios.post('/save-user-data', {
		JWT  : utils.getJWT(),
		data : data
	});
	
	Promise.all([ delay(500), request ]).then(res =>{
		
		res = res[ 1 ];
		handleResponse(res, dispatch, {
			type    : SAVEUSERDATA,
			payload : {isAuto}
		});
		
	});
	
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

export function goToAppViewData(){
	
	return {
		type : APPVIEWDATA
	};
	
}

export function goToAppViewInsights(){
	
	return {
		type : APPVIEWINSIGHTS
	};
	
}

export function goToAppViewConfig(){
	
	return {
		type : APPVIEWCONFIG
	};
	
}

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