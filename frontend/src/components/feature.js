import React, {Component} from 'react';
import {Link} from 'react-router';

const ns = 'jst-feature';

export default class Feature extends Component {
	
	render(){
		
		return (
			<div className={`${ns} mod-${this.props.isReverse ? 'reverse' : 'initial'}`}>
				<h3>{this.props.title}</h3>
				<h4>{this.props.description}</h4>
				<div>
					<Link to='/app' className={ns + '-link jst-button-primary'}>Try it</Link>
				</div>
			</div>
		);
		
	}
	
}
