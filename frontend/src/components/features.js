import React, {Component} from 'react';
import Intro from './intro';
import Feature from './feature';
import features from './feature-data';
import {Link} from 'react-router';

const ns = 'jst-features-page';

export default class Features extends Component {
	render(){
		return (
			<div className={ns}>
				<Intro cssMod='small' />
				{features.map(( f, i ) =>{
					return <Feature key={i} {...f} isReverse={i % 2} />;
				})}
			</div>
		);
	}
}