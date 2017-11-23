import React, {Component} from 'react';
import {connect} from 'react-redux';
import ToggleButton from 'react-toggle-button';
import {fullStages as stageNames} from './stages_data';
import {
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Legend,
	Bar,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Area,
	AreaChart
} from 'recharts';
import _ from 'lodash';
import moment from 'moment';
import utils from './../../utils/utils';

const ns = 'jst-app-logic-view-insights';

class InsightsView extends Component {
	
	constructor( props ){
		super(props);
		this.state = {
			excludeInactive   : false,
			excludeInterested : true,
			excludeRejected   : false,
			salt              : Math.random() * 360,
		};
	}
	
	render(){
		
		const charts = this.getInsightsData();
		
		return (
			<div className={ns}>
				<h2 className={`${ns}-options-title`}>Options</h2>
				<div className={`${ns}-options-wrap`}>
					{this.renderToggle('excludeInactive', 'Exclude Inactive Jobs')}
					{this.renderToggle('excludeInterested', 'Exclude Jobs in Interesting Stage')}
					{this.renderToggle('excludeRejected', 'Exclude rejected Jobs')}
				</div>
				<div className={`${ns}-charts-wrap`}>
					<div className={`${ns}-charts-group`}>
						{this.renderChart('Stages by Location', 'bar', charts.stageByLocationBars, {XAxisKey : 'location'})}
						{this.renderChart('Stages overall', 'pie', charts.stageByLocationPie)}
					</div>
					<div className={`${ns}-charts-group`}>
						{this.renderChart('Ranks by Location', 'bar', charts.rankByLocationBars, {XAxisKey : 'location'})}
						{this.renderChart('Ranks overall', 'pie', charts.rankByLocationPie)}
					</div>
					<div className={`${ns}-charts-group`}>
						{this.renderChart('Roles by Location', 'bar', charts.roleByLocationBars, {XAxisKey : 'location'})}
						{this.renderChart('Roles overall', 'pie', charts.roleByLocationPie)}
					</div>
					<div className={`${ns}-charts-group`}>
						{this.renderChart('Added by Time', 'bar-time', charts.addedByTime, {
							XAxisKey : 'time',
							barKey   : 'number',
						})}
						{this.renderChart('Ranks by Time', 'line-time', charts.rankByTime, {XAxisKey : 'time'})}
					</div>
					<div className={`${ns}-numeric`}>
						<h2 className={`${ns}-other-title`}>Other metrics:</h2>
						<div>
							<div>
								<div>Active Jobs:</div>
								<div>Inactive Jobs:</div>
								<div>Total Jobs:</div>
							</div>
							<div>
								<div>Min salary:</div>
								<div>Max salary:</div>
								<div>Avg salary:</div>
							</div>
							<div>
								<div>Companies:</div>
								<div>Drop rate:</div>
								<div>Inactive rate:</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
		
	}
	
	getInsightsData(){
		
		const jobs = _.sortBy(this.props.user.data.jobs, 'insertedOn');
		
		const res = {
			//STAGES BY LOCATION
			stageByLocationBars : {
				data : {},
				bars : {}
			},
			stageByLocationPie  : {
				data : {},
			}, //RANK BY LOCATION
			rankByLocationBars  : {
				data : {},
				bars : {}
			},
			rankByLocationPie   : {
				data : {},
			}, //ROLE BY LOCATION
			roleByLocationBars  : {
				data : {},
				bars : {}
			},
			roleByLocationPie   : {
				data : {},
			}, //OTHERS
			addedByTime         : {
				data : {},
			},
			rankByTime          : {
				data       : {},
				prevValues : {
					A : 0,
					B : 0,
					C : 0,
					D : 0,
					E : 0,
					F : 0,
				}
			},
			minInsertedDate     : Infinity,
			maxInsertedDate     : 0
		};
		
		for ( let k in jobs ) {
			
			let job = jobs[ k ];
			
			if ( this.isJobIncluded(job) ) {
				
				let rank = utils.getJobRank(job, this.props.user.data.configuration);
				
				//STAGES BY LOCATION
				byLocationOps('stage', stageNames[ utils.getJobStageCode(job, this.props.user.data.configuration.nrpl) ], job);
				
				//RANK BY LOCATION
				byLocationOps('rank', rank, job);
				
				//ROLE BY LOCATION
				byLocationOps('role', job.role, job);
				
				//ADDED BY TIME
				let date      = moment(job.insertedOn).startOf('date');
				let timeStamp = +date;
				
				createIfNotExits(res.addedByTime.data, timeStamp);
				addOrInitialize(res.addedByTime.data[ timeStamp ], 'number');
				
				if ( timeStamp < res.minInsertedDate ) {
					res.minInsertedDate = timeStamp;
				}
				if ( timeStamp > res.maxInsertedDate ) {
					res.maxInsertedDate = timeStamp;
				}
				
				//RANK BY TIME
				createIfNotExits(res.rankByTime.data, timeStamp);
				addOrInitialize(res.rankByTime.prevValues, rank);
				res.rankByTime.data[ timeStamp ] = {...res.rankByTime.prevValues};
			}
			
		}
		
		//STAGES BY LOCATION
		byLocationPostOps('stage');
		
		//RANK BY LOCATION
		byLocationPostOps('rank');
		res.rankByLocationBars.bars = res.rankByLocationBars.bars.sort();
		res.rankByLocationPie.data  = sortObjectKeys(res.rankByLocationPie.data);
		
		//ROLE BY LOCATION
		byLocationPostOps('role');
		
		//ADDED BY TIME
		addMissingDates(res.minInsertedDate, res.maxInsertedDate, 2, res.addedByTime.data, function( prevValue ){
			return {number : 0};
		}), {};
		res.addedByTime.data = _.sortBy(objToArrayWithKeys(res.addedByTime.data, 'time'), 'time');
		
		//RANK BY TIME
		addMissingDates(res.minInsertedDate, res.maxInsertedDate, 2, res.rankByTime.data, function( prevValue ){
			return {...prevValue};
		}, {
							A : 0,
							B : 0,
							C : 0,
							D : 0,
							E : 0,
							F : 0,
						});
		res.rankByTime.data = _.sortBy(objToArrayWithKeys(res.rankByTime.data, 'time'), 'time');
		
		//FINAL RES
		return res;
		
		//UTILS FUNCTIONS
		
		function byLocationPostOps( mainKey ){
			res[ mainKey + 'ByLocationBars' ].data = objToArrayWithKeys(res[ mainKey + 'ByLocationBars' ].data, 'location');
			res[ mainKey + 'ByLocationBars' ].data = _.sortBy(res[ mainKey + 'ByLocationBars' ].data, [ 'location' ]);
			res[ mainKey + 'ByLocationBars' ].bars = Object.keys(res[ mainKey + 'ByLocationBars' ].bars);
		}
		
		function byLocationOps( mainKey, data, job ){
			createIfNotExits(res[ mainKey + 'ByLocationBars' ].data, job.location);
			
			let dataPoint = res[ mainKey + 'ByLocationBars' ].data[ job.location ];
			
			addOrInitialize(dataPoint, data);
			addOrInitialize(res[ mainKey + 'ByLocationPie' ].data, data);
			
			res[ mainKey + 'ByLocationBars' ].bars[ data ] = 1;
		}
		
		function addMissingDates( minDate, maxDate, dayOffset, obj, addFn, initialValue ){
			let prev      = initialValue;
			const tOffset = 1000 * 3600 * 24 * dayOffset;
			for ( let t = minDate - tOffset; t <= maxDate + tOffset; t += (1000 * 3600 * 24) ) {
				if ( !obj[ t ] ) {
					obj[ t ] = addFn(prev);
				}
				prev = obj[ t ];
			}
		}
		
		function objToArrayWithKeys( obj, keyName ){
			return _.map(obj, ( values, key ) =>{
				return {[keyName] : key, ...values};
			});
		}
		
		function createIfNotExits( obj, key ){
			if ( !obj[ key ] ) {
				obj[ key ] = {};
			}
		}
		
		function addOrInitialize( obj, key ){
			obj[ key ] ? ++obj[ key ] : obj[ key ] = 1;
		}
		
		function sortObjectKeys( obj, reverse = false ){
			let arr = Object.keys(obj).sort();
			if ( reverse ) {
				arr.reverse();
			}
			return arr.reduce(( acc, key ) =>{
				acc[ key ] = obj[ key ];
				return acc;
			}, {});
		}
		
	}
	
	renderToggle( key, text ){
		return (
			<label className={`${ns}-toggle-wrap`}>
				<ToggleButton value={this.state[ key ]} onToggle={this.handleToggle.bind(this, key)} />
				<span>{text}</span>
			</label>
		);
	}
	
	isJobIncluded( job ){
		
		const timeToStall = this.props.user.data.configuration.nrpl;
		let isActive      = !utils.isJobStalled(job, timeToStall);
		
		const {excludeInactive, excludeInterested, excludeRejected} = this.state;
		
		if ( excludeInactive && !isActive ) {
			
			return false;
			
		}
		
		if ( excludeInterested && +job.stageCode === 0 ) {
			
			return false;
			
		}
		
		if ( excludeRejected && !([ 7, 8 ].indexOf(+job.stageCode) === -1) ) {
			
			return false;
			
		}
		
		return true;
		
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
				case 'bar-time':
					return this.renderBarTimeChart(chartData, options.XAxisKey, options.barKey);
					break;
				case 'line-time':
					return this.renderLineTimeChart(chartData, options.XAxisKey);
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
				<Tooltip separator={': '} />
				<Legend />
				{data.bars.map(( bar, i ) =>
								   <Bar key={i} dataKey={bar} fill={utils.generateLegendColor(i, tot, this.state.salt)} />)}
			</BarChart>
		);
		
	}
	
	renderBarTimeChart( data, XAxisKey, barKey ){
		
		const tot = data.data.length;
		
		return (
			<BarChart data={data.data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={XAxisKey} tickFormatter={( time ) => moment(+time).format('DD MMM')} />
				<YAxis />
				<Tooltip separator={': '} labelFormatter={v => moment(+v).format('DD MMMM')} />
				<Bar dataKey={barKey} fill={utils.generateLegendColor(0, tot, this.state.salt)} />
			</BarChart>
		);
		
	}
	
	renderLineTimeChart( data, XAxisKey ){
		
		const lastItem = {...data.data[ data.data.length - 1 ]};
		delete lastItem[ XAxisKey ];
		const tot   = lastItem.length - 1;
		const names = Object.keys(lastItem);
		
		return (
			<AreaChart data={data.data}>
				<defs>
					{names.map(( e, i ) => <linearGradient key={i} id={`color${i}`} x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor={utils.generateLegendColor(i, tot, this.state.salt)} stopOpacity={0.8} />
						<stop offset="95%" stopColor={utils.generateLegendColor(i, tot, this.state.salt)} stopOpacity={0} />
					</linearGradient>)}
				</defs>
				<XAxis dataKey={XAxisKey} tickFormatter={( time ) => moment(+time).format('DD MMM')} />
				<YAxis />
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip separator={': '} labelFormatter={v => moment(+v).format('DD MMMM')} />
				{names.map(( e, i ) =>
							   <Area key={i} type="monotone" dataKey={e} stroke={utils.generateLegendColor(i, tot, this.state.salt)} fillOpacity={1} fill={`url(#color${i})`} />)}
			</AreaChart>
		);
		
	}
	
	renderPieChart( data ){
		
		const dataArray = _.map(data.data, ( v, k ) => ({
			key    : k,
			number : v
		}));
		
		const tot    = dataArray.length;
		const RADIAN = Math.PI / 180;
		
		const renderCustomizedLabel = ( {cx, cy, midAngle, innerRadius, outerRadius, payload} ) =>{
			
			const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
			const x      = cx + radius * Math.cos(-midAngle * RADIAN);
			const y      = cy + radius * Math.sin(-midAngle * RADIAN);
			
			const text =
					  <text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central">{payload.payload.key}</text>;
			return text;
			
		};
		
		return (
			<PieChart>
				<Tooltip separator={': '} />
				<Pie data={dataArray} dataKey="number" nameKey="key" fill="#8884d8" labelLine={false} label={renderCustomizedLabel}>
					{dataArray.map(( e, i ) =>
									   <Cell key={i} fill={utils.generateLegendColor(i, tot, this.state.salt)} />)}
				</Pie>
			</PieChart>
		);
		
		
	}
	
	handleToggle = ( key ) =>{
		this.setState({[key] : !this.state[ key ]});
	};
}


export default connect(( {user} ) =>{
	return {
		user
	};
}, null)(InsightsView);