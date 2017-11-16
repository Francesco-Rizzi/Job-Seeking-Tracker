import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import data from './config_view_data';
import Slider, {createSliderWithTooltip} from 'rc-slider';

const SliderWithTooltip = createSliderWithTooltip(Slider);
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
				<h2 className={`${ns}-title`}>
					{group.name}
				</h2>
				{group.fields.map(( f, i ) => this.renderConfigField(f, i))}
			</div>
		);
	}
	
	renderConfigField( field, i ){
		
		const min   = field.min || 0;
		const max   = field.max || 10;
		const step  = (max - min) / 10;
		const value = this.props.user.data.configuration[ field.code ];
		
		return (
			<div className={`${ns}-field`} key={i}>
				<div className={`${ns}-field-name-slider-wrap`}>
					<div className={`${ns}-field-name`}>
						{field.name}
					</div>
					<div className={`${ns}-field-slider`}>
						<SliderWithTooltip step={step} min={min} max={max} defaultValue={value} onAfterChange={this.onSliderChange.bind(this, field.code)} />
					</div>
				</div>
				<div className={`${ns}-field-description`}>
					{field.desc}
				</div>
			</div>
		);
	};
	
	onSliderChange( code, v ){
		this.props.setConfigValue(code,v);
	}
	
}


export default connect(( {user, ui} ) =>{
	return {
		user,
		ui
	};
}, actions)(ConfigView);