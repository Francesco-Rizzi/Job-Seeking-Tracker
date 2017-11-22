import React, {Component} from 'react';
import inputsData from './app_logic/config_view_data';
import _ from 'lodash';

const ns = 'jst-the-company-ranker-page';

export default class TheCompanyRankerPage extends Component {
	
	render(){
		
		const inputs = _.filter(inputsData.dataGroups, {'isWeight' : true});
		
		return (
			<div className={ns}>
				
				<h1 className={`${ns}-title`}>The Company Ranker</h1>
				<h2 className={`${ns}-subtitle`}>
					The Company Ranker is a powerful decision-helper tool which ranks companies tailored on <i>your</i> preferences.
				</h2>
				
				<div className={`${ns}-desc`}>
					This sounds kinda of going to school for companies? It is.
					<br />
					<br />
					Its main purpose is to give a simple and straightforward overview of a company using many different inputs to find at a glance which is the best company to go forward with. I took inspiration from some broad Machine Learning interest and knowledge, in fact it uses <b>13 different parameters weighted on your preferences</b> (you can fine tune each weight in the app config view). Then is mainly a work of mapping ranges to other ranges in order to get an high level metric (the Rank, from A to F), thus I created this simple library: <a href='https://github.com/Francesco-Rizzi/Math.mapRange' target='_blank'>Math.mapRange</a>.
					<br />
					<br />
					<i>Why The Company Ranker?</i> Because the job seeking process can be long and painful, and having a tool which can give you an immediate visual explanation on how things are going on is really helpful. You don't have to review every time the job offers to understand which is better, it is now really simple! <b>A</b> means <i>TOP offer</i>, while <b>F</b> means <i>really bad offer</i>.
					<br />
					<div className={`${ns}-image`}>
						<img src='/libs/assets/images/the-company-ranker.svg' title='The Company Ranker logic'/>
					</div>
					<br />
					<b>Q:</b> But I'm not interested in money, my main interest is the company culture!
					<br />
					<b>A:</b> No problem! With this tool you can set how much something is important in your decision. Money is not important? Give it a low weight in the configuration! Culture is your main concern? Give it an high weight in the configuration, easy right? You can fine-tune 13 different factors! Here a list:
					<br />
					<div>
						{this.renderInputs(inputs)}
					</div>
					<br />
					<b>Q:</b> How do you evaluate culture, benefits, etc.?
					<br />
					<b>A:</b> You evaluate them! Every job has its own evaluations (from 0 to 5, step of 0.5) in stars, using it is really much simpler that explaining it, give it a try! Here an example of what you'd see:
					<br />
					<div className={`${ns}-image`}>
						<img src='/libs/assets/images/stars.png' title='The Company Ranker logic' />
					</div>
				</div>
			
			</div>
		);
		
	}
	
	renderInputs( inputs ){
		return inputs.map(( i, k ) => (
			<div key={k} className={`${ns}-input`}>
				<div className={`${ns}-input-name`}>{i.name}</div>
				<ul>
					{i.fields.map(( f, k ) => (
						<li key={k} className={`${ns}-input-item`}>{f.name}</li>
					))}
				</ul>
			</div>
		));
		
	}
	
};
