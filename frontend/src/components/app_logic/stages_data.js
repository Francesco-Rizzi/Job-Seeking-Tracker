const stages = {
	0 : 'Interesting',
	1 : 'Candidate',
	2 : 'Exploration call',
	3 : 'Practical challenge',
	4 : 'On-site interview',
	5 : 'Final interview',
	6 : 'Offer',
	7 : 'Rejected',
	8 : 'Rejected by me',
};

export const fullStages = {
	...stages,
	9 : 'Inactive (no reply)'
};

export default stages;