export default {
	
	saveJWT( JWT ){
		
		return localStorage.setItem('JWT', JWT);
		
	},
	
	getJWT(){
		
		return localStorage.getItem('JWT') || false;
		
	}
	
	
};