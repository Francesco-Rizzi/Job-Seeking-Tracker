import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import data from './config_view_data';

const ns = 'jst-app-logic-view-config';

class ConfigView extends Component {
	
	render(){
		
		return (
			<div className={ns}>
				{data.dataGroups.map(( g, i ) => this.renderGroup(g, i))}
			</div>
		);
		
	}
	
	renderGroup( group, i ){
		return (
			<div className={`${ns}-group mod-${group.cssMod}`} key={i}>
				<div className={`${ns}-title`}>
					{group.name}
				</div>
				{group.fields.map(( f, i ) => this.renderConfigField(f, i))}
			</div>
		);
	}
	
	renderConfigField( field, i ){
		return (
			<div className={`${ns}-field`} key={i}>
				<div className={`${ns}-field-name`}>
					{field.name}
				</div>
				<div className={`${ns}-field-description`}>
					{field.desc}
				</div>
			</div>
		);
	}
	
}


export default connect(( {user, ui} ) =>{
	return {
		user,
		ui
	};
}, actions)(ConfigView);