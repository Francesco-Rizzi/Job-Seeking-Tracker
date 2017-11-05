import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './header';
import Frozen from './frozen';

const ns = 'jst-structure';

class Structure extends Component {
	
	render(){
		
		const title    = this.props.children.props.route.title;
		document.title = title;
		
		return (
			<div className={`${ns}`}>
				<div className={`${ns}-wrapper ${this.props.ui.isFrozen ? 'mod-frozen' : ''}`}>
					<Header />
					<div className="body-wrapper">
						<div className="container">
							{this.props.children}
						</div>
					</div>
				</div>
				<Frozen />
			</div>
		);
		
	}
	
}

export default connect(( {ui} ) =>{
	return {
		ui
	};
})(Structure);