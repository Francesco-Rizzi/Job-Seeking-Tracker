import React, {Component} from 'react';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import data from './config_view_data';
import Slider, {createSliderWithTooltip} from 'rc-slider';
import _ from 'lodash';

const SliderWithTooltip = createSliderWithTooltip(Slider);
const ns                = 'jst-app-logic-view-config';
const initialState      = {
	reset   : false,
	sliders : {}
};

class ConfigView extends Component {
	
	constructor( props ){
		super(props);
		this.state = _.cloneDeep(initialState);
	}
	
	render(){
		
		return (
			<div className={ns}>
				{data.dataGroups.map(( g, i ) => this.renderGroup(g, i))}
				{this.renderReset()}
			</div>
		);
		
	}
	
	renderGroup( group, i ){
		return (
			<div className={`${ns}-group mod-${group.cssMod}`} key={i}>
				<h2 className={`${ns}-title`}>
					{group.name}
				</h2>
				{/* Actually not so dangerous */}
				{group.desc &&
				 <div className={`${ns}-description`} dangerouslySetInnerHTML={{__html : group.desc}}></div>}
				{group.fields && group.fields.map(( f, i ) => this.renderConfigField(f, i))}
			</div>
		);
	}
	
	renderConfigField( field, i ){
		
		const min   = field.min || 0;
		const max   = field.max || 10;
		const step  = (max - min) / 10;
		const value = this.state.sliders[ field.code ] !== undefined ? this.state.sliders[ field.code ] : this.props.user.data.configuration[ field.code ];
		
		return (
			<div className={`${ns}-field`} key={i}>
				<div className={`${ns}-field-name-slider-wrap`}>
					<div className={`${ns}-field-name`}>
						{field.name}
					</div>
					<div className={`${ns}-field-slider`}>
						<SliderWithTooltip step={step} min={min} max={max} value={value} onChange={this.onSliderChanging.bind(this, field.code)} onAfterChange={this.onSliderAfterChange.bind(this, field.code)} />
					</div>
				</div>
				<div className={`${ns}-field-description`}>
					{field.desc}
				</div>
			</div>
		);
	};
	
	renderReset(){
		const resetEnabled = this.state.reset;
		return (
			<div className={`${ns}-reset-wrap`}>
				<button type='button' className={`jst-button-alert`} onClick={() => this.setState({reset : !resetEnabled})}>{resetEnabled ? 'Disable' : 'Enable'} Reset</button>
				<button type='button' className={`jst-button-${!resetEnabled ? 'disabled' : 'danger'} mod-space-left`} disabled={!resetEnabled} onClick={this.onReset}>Reset (cannot undo)</button>
			</div>
		);
	}
	
	onSliderChanging( code, v ){
		console.log(v);
		this.setState({sliders : {[code] : v}});
	}
	
	onSliderAfterChange( code, v ){
		this.props.setConfigValue(code, v);
	}
	
	onReset = () =>{
		this.setState(_.cloneDeep(initialState));
		this.props.resetUserData();
		scroll(0, 0);
	};
	
}


export default connect(( {user} ) =>{
	return {
		user
	};
}, actions)(ConfigView);