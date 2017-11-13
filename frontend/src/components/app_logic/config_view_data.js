export default {
	
	dataGroups : [
		
		{
			name   : 'Salary and Equity rater configuration',
			fields : [ {
				name : 'Salary 0 rating',
				desc : 'Select the worst case salary(K), where you\'d give a 0 rating.',
				code : 'slzr',
				max  : 80
			}, {
				name : 'Salary 10 rating',
				desc : 'Select the best case salary(K), where you\'d give a 10 rating.',
				code : 'sltr',
				min  : 50,
				max  : 200
			}, {
				name : 'Equity 0 rating',
				desc : 'Select the worst case equity(%), where you\'d give a 0 rating.',
				code : 'eqzr',
				max  : 2
			}, {
				name : 'Equity 10 rating',
				desc : 'Select the best case equity(%), where you\'d give a 10 rating.',
				code : 'eqtr',
				min  : 2,
				max  : 20
			} ]
		},
		
		{
			name   : 'Financial package weights',
			fields : [ {
				name : 'Salary',
				desc : 'How much is salary important in your job decision between 0(= I don\'t care at all) and 10(= This is a very key aspect).',
				code : 'slzr',
				max  : 10
			}]
		}
	
	]
	
};

//STAGES
//0 - candidate
//1 - exploration call
//2 - practical task
//3 - on-site interview
//4 - final interview
//5 - offer
//6 - rejected