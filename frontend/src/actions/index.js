import {SIGNIN, SIGNOUT, SIGNUP} from "./type";

export default function signIn( email, password ){
	
	return {
		type    : SIGNIN,
		payload : {}
	};
	
}
