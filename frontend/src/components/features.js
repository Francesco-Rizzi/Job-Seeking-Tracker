import React, {Component} from 'react';
import Intro from './intro';
import Feature from './feature';
import features from './feature-data';
import {Link} from 'react-router';

const ns = 'jst-features-page';

export default class Features extends Component {
	render(){
		return (
			<div>
				<Intro cssMod='small' />
				{features.map(( f, i ) =>{
					return <Feature key={i} {...f} isReverse={i % 2} />;
				})}
				<h3>About the author:</h3>
				<div>
					<Link to='/about' className={ns + '-link jst-button-primary'}>Discover more</Link>
				</div>
			</div>
		);
	}
}