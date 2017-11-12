import _ from 'lodash';
import axios from 'axios';

export default class Utils{
	
	static saveJWT = ( JWT ) =>{
		
		return localStorage.setItem('JWT', JWT);
		
	};
	
	static getJWT = () =>{
		
		return localStorage.getItem('JWT') || false;
		
	};
	
	static deleteJWT = () =>{
		
		return localStorage.removeItem('JWT');
		
	};
	
	static startJWTAutoRenewal = () =>{
		
		const f = _.once(() =>{
			
			setTimeout(Utils.renewJWT, 1000 * 60 * 15); // every 15 minutes
			return true;
			
		});
		
		return f();
		
	};
	
	static renewJWT = () =>{
		
		const JWT = Utils.getJWT();
		JWT && axios.post('/renew-jwt', {JWT}).then(( res ) =>{
			
			if ( res.error ) {
				//Utils.triggerNotification('error', res.error);
			} else {
				Utils.saveJWT(res.JWT);
			}
			
		});
		
	};
	
	static isJWTExpired = ( JWT ) =>{
		
		if ( JWT ) {
			const token = Utils.parseJWT(JWT);
			return token.exp >= (+new Date);
		}
		return true;
		
	};
	
	static parseJWT = ( JWT ) =>{
		
		const base64Url = JWT.split('.')[ 1 ];
		const base64    = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
		
	};
	
	static triggerNotification = ( type, message ) =>{
		
		window.dispatchEvent(new CustomEvent('userNotification', {
			detail : {
				type,
				message
			}
		}));
		
	};
	
};