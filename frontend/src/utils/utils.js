import _ from 'lodash';
import axios from 'axios';

export default class {
	
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
			
			setTimeout(this.renewJWT, 1000 * 60 * 15); // every 15 minutes
			return true;
			
		});
		
		return f();
		
	};
	
	static renewJWT = () =>{
		
		const JWT = this.getJWT();
		JWT && axios.post('/renew-jwt', {JWT}).then(( res ) =>{
			
			if ( res.error ) {
				//this.triggerNotification('error', res.error);
			} else {
				this.saveJWT(res.JWT);
			}
			
		});
		
	};
	
	static isJWTExpired = ( JWT ) =>{
		
		if ( JWT ) {
			const token = this.parseJWT(JWT);
			return token.exp <= (+new Date);
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