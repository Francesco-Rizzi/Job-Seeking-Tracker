import React, {Component} from 'react';
import Intro from './intro';
import Feature from './feature';
import features from './feature-data';

const ns = 'jst-features-page';

export default class Features extends Component {
	render(){
		return (
			<div>
				<Intro cssMod='small' />
				{features.map(( f, i ) =>{
					return <Feature key={i} {...f} isReverse={i % 2} />;
				})}
				<div className={ns + '-about'}>
					<h3>About the author:</h3>
					<h4>eee</h4>
				</div>
			</div>
		);
	}
}