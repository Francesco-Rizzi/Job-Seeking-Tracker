import React, {Component} from 'react';
import {Link} from 'react-router';

const ns = 'jst-intro';

export default class Intro extends Component {
	render(){
		return (
			<div className={`${ns} mod-${this.props.cssMod || 'initial'}`}>
				<div className={ns + '-text'}>
					<h1 className={ns + '-title'}>👔 Job Seeking Tracker <span className={`${ns}-title-features`}>Features</span></h1>
					<h2 className={ns + '-subtitle'}>A simple yet powerful tool for effectively track, update and manage your job seeking activity.</h2>
					<div className={ns + '-cta'}>
						<Link to='/app' className={ns + '-link jst-button-primary'}>App</Link>
						<Link to='/features' className={ns + '-link jst-button-primary'}>Features</Link>
						<Link to='/about' className={ns + '-link jst-button-primary'}>About</Link>
					</div>
				</div>
			</div>
		);
	}
}
