import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from './loader';

const ns = 'jst-frozen';

class Frozen extends Component {
	
	render(){
		if ( this.props.ui.isFrozen ) {
			return <div className={`${ns}-message is-visible`}>
				<span className={`${ns}-message-loader`}>
					<Loader />
				</span>
				<span className={`${ns}-message-title`}>{this.props.ui.frozenMessage}</span>
				<span className={`${ns}-message-subtitle`}>{generateSubtitle()}</span>
			</div>;
		} else {
			return <div className={`${ns}-message`}></div>;
		}
		
		function generateSubtitle(){
			
			const num = Math.random() * 5;
			
			switch ( true ) {
				
				case (num < 1):
					return 'calculating the space-time equation';
					break;
				
				case (num < 2):
					return 'zooming inside the mandelbrot set';
					break;
				
				case (num < 3):
					return 'calculating the entropy of the universe';
					break;
				
				case (num < 4):
					return 'finding the higgs boson';
					break;
				
				case (num < 5):
					return 'hacking the gravity force';
					break;
				
			}
			
		}
		
	}
	
}

export default connect(( {ui} ) =>{
	return {
		ui
	};
})(Frozen);