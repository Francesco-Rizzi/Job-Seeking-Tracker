import React, {Component} from 'react';
import {APPVIEWCONFIG, APPVIEWDATA, APPVIEWINSIGHTS} from "../../actions/type";
import * as actions from '../../actions';
import {connect} from 'react-redux';

const ns = 'jst-app-logic-header';

class Header extends Component {
	
	render(){
		return (
			<nav className={ns}>
				<ul className={`${ns}-items`}>
					<li key='1' className={`${ns}-item`}>
						{this.renderLink('Data', APPVIEWDATA)}
					</li>
					<li key='2' className={`${ns}-item`}>
						{this.renderLink('Insights', APPVIEWINSIGHTS)}
					</li>
					<li key='3' className={`${ns}-item`}>
						{this.renderLink('Config', APPVIEWCONFIG)}
					</li>
				</ul>
			</nav>
		);
	}
	
	renderLink( name, type ){
		return <a className={`${ns}-link ${this.props.ui.appView === type ? 'active' : ''}`} onClick={this.props.goToAppView.bind(this, type)}>{name}</a>;
	}
	
}

export default connect(( {ui} ) =>{
	return {
		ui
	};
}, actions)(Header);