import React, {Component} from 'react';
import {Link} from 'react-router';

const ns = 'jst-feature';

export default class Feature extends Component {
	
	render(){
		
		return (
			<div className={`${ns} mod-${this.props.isReverse ? 'reverse' : 'initial'}`}>
				<div className={`${ns}-text`}>
					<h3 className={`${ns}-title`}>{this.props.title}</h3>
					{/* Actually not so dangerous */}
					<h4 className={`${ns}-subtitle`} dangerouslySetInnerHTML={{__html : this.props.description}}></h4>
					<div className={`${ns}-link`}>
						<Link to='/app' className={ns + '-link jst-button-primary'}>Take me to the App!</Link>
					</div>
				</div>
				<div className={`${ns}-image`} style={{backgroundImage: `url(assets/assets/images/${this.props.image})`}}>image</div>
			</div>
		);
		
	}
	
}
