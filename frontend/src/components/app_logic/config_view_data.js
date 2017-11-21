export default {
	
	dataGroups : [
		
		{
			name   : 'Salary and Equity rater configuration',
			cssMod : 'rater',
			fields : [ {
				name : 'Salary 0 rating',
				desc : 'Select the worst case salary(K/y), where you\'d give a 0 rating.',
				code : 'slzr',
				min  : 20,
				max  : 70
			}, {
				name : 'Salary 10 rating',
				desc : 'Select the best case salary(K/y), where you\'d give a 10 rating.',
				code : 'sltr',
				min  : 80,
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
			name   : 'Miscellaneous',
			cssMod : 'misc',
			fields : [ {
				name : 'Time to stall',
				desc : 'Select the time (in Days) of inactivity to mark a job as inactive (no reply).',
				code : 'nrpl',
				min  : 4,
				max  : 44
			} ]
		},
		
		{
			name   : 'The Company Ranker',
			cssMod : '',
			desc   : 'The Company Ranker is a powerful decision-helper tool which ranks companies tailored on <i>your</i> preferences. Below you can fine-tune each one of the 13 different inputs that it uses for ranking companies, choosing what matters most for you! Discover move on how it works: <a href="/features/the-company-ranker" target="_blank">The Company Ranker</a>.'
		},
		
		{
			name     : 'Financial package',
			isWeight : true,
			cssMod   : 'finance',
			fields   : [ {
				name : 'Salary',
				desc : 'How much is salary important in your job decision between 0 (I don\'t care at all) and 10 (this is a very key aspect).',
				code : 'w_fpk1',
				max  : 10
			}, {
				name : 'Equity',
				desc : 'How much are the company equities and stock options important in your job decision between 0 and 10.',
				code : 'w_fpk2',
				max  : 10
			}, {
				name : 'Benefits',
				desc : 'How much are the benefits (ex. free lunch, subsided canteen, gym membership, parking, etc.) important in your job decision between 0 and 10.',
				code : 'w_fpk3',
				max  : 10
			} ]
		},
		
		{
			name     : 'Successful prospect of you in the company',
			isWeight : true,
			cssMod   : 'pic',
			fields   : [ {
				name : 'Current traction',
				desc : 'How much is the current traction of the company important in your job decision between 0 and 10.',
				code : 'w_pic1',
				max  : 10
			}, {
				name : 'Founder\'s strength',
				desc : 'Founders are the ones whom will take the most important decisions for the company future, how much is this important in your job decision between 0 and 10.',
				code : 'w_pic2',
				max  : 10
			}, {
				name : 'Growth rate',
				desc : 'How much is the growth rate (how much the company is expanding now and in the future) of the company important in your job decision between 0 and 10.',
				code : 'w_pic3',
				max  : 10
			}, {
				name : 'Employees retention',
				desc : 'Retaining employees is a good sign of treating them well and offer them a career progression and opportunities, how much is that important in your job decision between 0 and 10.',
				code : 'w_pic4',
				max  : 10
			}, {
				name : 'Career opportunities',
				desc : 'How much having a career path with opportunities to take high level roles is important in your job decision between 0 and 10.',
				code : 'w_pic5',
				max  : 10
			} ]
		},
		
		{
			name     : 'Successful prospect of you in another company',
			isWeight : true,
			cssMod   : 'poc',
			fields   : [ {
				name : 'Learning opportunities',
				desc : 'How much the learning and professional growth opportunities are important in your job decision between 0 and 10.',
				code : 'w_poc1',
				max  : 10
			}, {
				name : 'Company size and reputation',
				desc : 'How much the company size/reputation/awareness in order to be very nice looking on your CV and career path is important in your job decision between 0 and 10.',
				code : 'w_poc2',
				max  : 10
			} ]
		},
		
		{
			name     : 'Personal preferences',
			isWeight : true,
			cssMod   : 'ppr',
			fields   : [ {
				name : 'Team composition',
				desc : 'How much the team composition (size, roles, structure, etc.) is important in your job decision between 0 and 10.',
				code : 'w_ppr1',
				max  : 10
			}, {
				name : 'Location',
				desc : 'How much is the job location important in your job decision between 0 and 10.',
				code : 'w_ppr2',
				max  : 10
			}, {
				name : 'Culture',
				desc : 'How much important is the company and people culture in your job decision between 0 and 10.',
				code : 'w_ppr3',
				max  : 10
			} ]
		}
	
	]
	
};
