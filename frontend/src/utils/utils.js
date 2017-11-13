import _ from 'lodash';
import axios from 'axios';

let renewalJWTTimer = null;

export default class Utils {
	
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
		
		renewalJWTTimer = setInterval(Utils.renewJWT, 1000 * 60 * 15);
		
	};
	
	static stopJWTAutoRenewal = () =>{
		
		clearInterval(renewalJWTTimer);
		renewalJWTTimer = null;
		
	};
	
	static renewJWT = () =>{
		
		const JWT = Utils.getJWT();
		JWT && axios.post('/renew-jwt', {JWT}).then(( {data} ) =>{
			
			if ( data.error ) {
				//Utils.triggerNotification('error', res.error);
			} else {
				Utils.saveJWT(data.JWT);
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
	
	static getMaxPossibleRank( conf ){
		
		const keys = Object.keys(conf);
		let tot    = 0;
		
		keys.forEach(k =>{
			
			if ( k.startsWith('w_') ) {
				
				tot += conf[ k ] * 10;
				
			}
			
		});
		
		return tot;
		
	};
	
	static getJobRank( job, conf ){
		
		const min = 0;
		const max = Utils.getMaxPossibleRank(conf);
		
		let jobValue = 0;
		
		jobValue += Utils.mathSqueeze(slzr, sltr, job.salary, 0, 10) * conf.w_fpk1;
		jobValue += Utils.mathSqueeze(eqzr, eqtr, job.equity, 0, 10) * conf.w_fpk2;
		
		Object.keys(job.rankings).forEach(k =>{
			
			let v = job.rankings[ k ];
			jobValue += v * conf[ 'w_' + k ];
			
		});
		
		jobValue = Math.floor(Utils.mathSqueeze(min, max, jobValue, 0, 6));
		return 'ABCDEF'[ jobValue ];
		
	}
	
	static mathSqueeze( min, max, v, newMin, newMax ){
		
		if ( v <= min ) {
			return newMin;
		}
		
		if ( v >= max ) {
			return newMax;
		}
		
		v -= min;
		max -= min;
		const percentage = (v / max) * 100;
		
		const newStep = (newMax - newMin) / 100;
		
		return percentage * newStep + newMin;
		
	}
	
};