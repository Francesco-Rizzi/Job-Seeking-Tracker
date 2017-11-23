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
		
		renewalJWTTimer = setInterval(Utils.renewJWT, 1000 * 60 * 5);
		Utils.renewJWT();
		
	};
	
	static stopJWTAutoRenewal = () =>{
		
		clearInterval(renewalJWTTimer);
		renewalJWTTimer = null;
		
	};
	
	static renewJWT = () =>{
		
		const JWT = Utils.getJWT();
		JWT && axios.post('/renew-jwt', {JWT}).then(( {data} ) =>{
			
			if ( data.error ) {
				Utils.triggerNotification('error', data.error);
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
		
		jobValue += Math.mapRange(conf.slzr, conf.sltr, job.salary, 0, 10) * conf.w_fpk1;
		jobValue += Math.mapRange(conf.eqzr, conf.eqtr, job.equity, 0, 10) * conf.w_fpk2;
		
		job.rankings && Object.keys(job.rankings).forEach(k =>{
			
			let v = job.rankings[ k ];
			jobValue += v * conf[ 'w_' + k ];
			
		});
		
		jobValue = Math.floor(Math.mapRange(min, max, jobValue, 0, 6));
		return 'FEDCBA'[ jobValue ];
		
	}
	
	static getJobID( job ){
		
		function hash( ...params ){
			
			let hash   = 0, i, chr;
			let string = params.join('');
			
			if ( string.length === 0 ) {
				throw new Error('Invalid hash arguments.');
			}
			
			for ( i = 0; i < string.length; i++ ) {
				chr  = string.charCodeAt(i);
				hash = ((hash << 5) - hash) + chr;
				hash |= 0;
			}
			
			return hash + '';
			
		};
		
		return hash(job.role, job.company, job.insertedOn);
		
	}
	
	static isJobStalled( job, daysToStall, referenceDate = +new Date(), ){
		
		const elapsedTime = referenceDate - job.lastContactOn;
		
		const days = elapsedTime / 1000 / 3600 / 24;
		return days > daysToStall;
		
	}
	
	static getJobStageCode( job, daysToStall, referenceDate ){
		return Utils.isJobStalled(job, daysToStall, referenceDate) ? 9 : job.stageCode;
	}
	
	static generateLegendColor( index, tot, salt = 0 ){
		
		let step = 360 / tot;
		step     = step < 40 ? step : 40;
		let hue  = (step * index + salt) % 360;
		return `hsl(${hue}, 35%, 55%)`;
		
	}
	
};