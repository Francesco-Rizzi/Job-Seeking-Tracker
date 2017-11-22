import React, {Component} from 'react';
import {connect} from 'react-redux';
import ToggleButton from 'react-toggle-button';
import {fullStages as stageNames} from './stages_data';
import {
	LineChart,
	Line,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell
} from 'recharts';
import _ from 'lodash';
import utils from './../../utils/utils';

const ns = 'jst-app-logic-view-insights';

class InsightsView extends Component {
	
	constructor( props ){
		super(props);
		this.state = {
			excludeInactive : false,
			salt            : Math.random() * 180,
		};
	}
	
	render(){
		
		const charts = this.getInsightsData();
		
		return (
			<div className={ns}>
				<h2 className={`${ns}-options-title`}>Options</h2>
				<div className={`${ns}-options-wrap`}>
					<label className={`${ns}-toggle-wrap`}>
						<ToggleButton value={this.state.excludeInactive} onToggle={this.handleExcludeInactiveChange} />
						<span>Exclude Inactive Jobs</span>
					</label>
				</div>
				<div className={`${ns}-charts-wrap`}>
					<div className={`${ns}-charts-group`}>
						{this.renderChart('Stages by Location','bar', charts.stageByLocationBars, {XAxisKey : 'location'})}
						{this.renderChart('Stages overall','pie', charts.stageByLocationPie)}
					</div>
				</div>
			</div>
		);
		
	}
	
	getInsightsData(){
		
		const jobs = this.props.user.data.jobs;
		
		const res = {
			stageByLocationBars : {
				data : {},
				bars : {}
			},
			stageByLocationPie  : {
				data : {},
			},
		};
		
		for ( let k in jobs ) {
			
			let job = jobs[ k ];
			
			if ( this.isJobIncluded(job) ) {
				
				//STAGES BY LOCATION
				res.stageByLocationBars.data[ job.location ] = res.stageByLocationBars.data[ job.location ] || {};
				
				let dataPoint      = res.stageByLocationBars.data[ job.location ];
				let stage          = stageNames[ utils.getJobStageCode(job, this.props.user.data.configuration.nrpl) ];
				dataPoint[ stage ] = dataPoint[ stage ] ? dataPoint[ stage ] + 1 : 1;
				
				res.stageByLocationBars.bars[ stage ] = 1;
				
				res.stageByLocationPie.data[ stage ] = res.stageByLocationPie.data[ stage ] + 1 || 1;
				
			}
			
		}
		
		//STAGES BY LOCATION
		res.stageByLocationBars.data = _.map(res.stageByLocationBars.data, ( values, key ) =>{
			return {location : key, ...values};
		});
		res.stageByLocationBars.bars = Object.keys(res.stageByLocationBars.bars);
		
		return res;
		
	}
	
	isJobIncluded( job ){
		
		const timeToStall       = this.props.user.data.configuration.nrpl;
		const {excludeInactive} = this.state;
		
		let isActive = !utils.isJobStalled(job, timeToStall);
		if ( !excludeInactive || (excludeInactive && isActive) ) {
			
			return true;
			
		}
		
		return false;
		
	}
	
	renderChart( name, type = false, chartData, options = {} ){
		
		const chooseChart = () =>{
			
			switch ( type ) {
				case 'bar':
					return this.renderBarChart(chartData, options.XAxisKey);
					break;
				case 'pie':
					return this.renderPieChart(chartData);
					break;
			}
			
		};
		
		return (
			<div className={`${ns}-chart-wrap`}>
				<h2 className={`${ns}-chart-title`}>{name}</h2>
				<ResponsiveContainer width={'100%'} height={400} minWidth={300}>
					{chooseChart()}
				</ResponsiveContainer>
			</div>
		);
		
		
	}
	
	renderBarChart( data, XAxisKey ){
		
		const tot = data.bars.length;
		
		return (
			<BarChart data={data.data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={XAxisKey} />
				<YAxis />
				<Tooltip />
				<Legend />
				{data.bars.map(( bar, i ) =>
								   <Bar key={i} dataKey={bar} fill={utils.generateLegendColor(i, tot, this.state.salt)} />)}
			</BarChart>
		);
		
	}
	
	renderPieChart( data ){
		
		const dataArray = _.map(data.data, ( v, k ) => ({
			stage  : k,
			number : v
		}));
		
		const tot    = dataArray.length;
		const RADIAN = Math.PI / 180;
		
		const renderCustomizedLabel = ( {cx, cy, midAngle, innerRadius, outerRadius, payload} ) =>{
			
			const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
			const x      = cx + radius * Math.cos(-midAngle * RADIAN);
			const y      = cy + radius * Math.sin(-midAngle * RADIAN);
			
			return (
				<text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central">
					{payload.payload.stage}
				</text>
			);
		};
		
		return (
			<PieChart>
				<Tooltip />
				<Pie data={dataArray} dataKey="number" nameKey="stage" fill="#8884d8" labelLine={false} label={renderCustomizedLabel}>
					{dataArray.map(( e, i ) => <Cell key={i} fill={utils.generateLegendColor(i, tot, this.state.salt)} />)}
				</Pie>
			</PieChart>
		);
		
		
	}
	
	handleExcludeInactiveChange = () =>{
		this.setState({excludeInactive : !this.state.excludeInactive});
	};
}


export default connect(( {user} ) =>{
	return {
		user
	};
}, null)(InsightsView);