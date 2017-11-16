export default {
	name     : false,
	isLogged : false,
	data     : {
		
		configuration : {
			
			//misc def
			ncmd : 15,
			slzr : 45,
			sltr : 140,
			eqzr : 1,
			eqtr : 11,
			
			//weights def
			w_fpk1 : 5,
			w_fpk2 : 5,
			w_fpk3 : 5,
			w_pic1 : 5,
			w_pic2 : 5,
			w_pic3 : 5,
			w_pic4 : 5,
			w_pic5 : 5,
			w_poc1 : 5,
			w_poc2 : 5,
			w_ppr1 : 5,
			w_ppr2 : 5,
			w_ppr3 : 5,
			
		},
		
		jobs : {
			
			123456 : {
				//First example company
				role          : 'Data Analyst',
				company       : 'ACME Corp.',
				location      : 'UK',
				link          : '',
				stageCode     : 1,
				lastContactOn : +(new Date()),
				insertedOn    : +(new Date()),
				salary        : 70000,
				equity        : 1.25,
				rankings      : {
					fpk3 : 6,
					pic1 : 4,
					pic2 : 6,
					pic3 : 2,
					pic4 : 7,
					pic5 : 7,
					poc1 : 4,
					poc2 : 4,
					ppr1 : 6,
					ppr2 : 8,
					ppr3 : 5,
				}
			},
		}
		
	},
};