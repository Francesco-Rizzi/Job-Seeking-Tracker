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
import TimeRangeSelector from './time_range';
import utils from './../../utils/utils';

const ns = 'jst-app-logic-view-insights';

class InsightsView extends Component {
	
	constructor( props ){
		super(props);
		this.state = {
			excludeInactive   : false,
			excludeInterested : true,
			excludeRejected   : false,
			lastContactMin    : +moment().subtract(30, 'days').startOf('date'),
			lastContactMax    : +moment().add(10, 'days').startOf('date'),
			insertedOnMin     : +moment().subtract(30, 'days').startOf('date'),
			insertedOnMax     : +moment().add(10, 'days').startOf('date'),
			salt              : Math.random() * 360,
		};
	}
	
	render(){
		
		const charts    = this.getInsightsData();
		const totalJobs = charts.misc.totalJobs;
		
		return (
			<div className={ns}>
				<h2 className={`${ns}-options-title`}>Options</h2>
				<div className={`${ns}-options-wrap`}>
					<div className={`${ns}-option-group`}>
						<div>
							<div className={`${ns}-option-title`}>Last contact date-range:</div>
							<TimeRangeSelector startDate={this.state.lastContactMin} endDate={this.state.lastContactMax} handleChangeStart={this.createTimeRangeHandler('lastContact')} handleChangeEnd={this.createTimeRangeHandler('lastContact', false)} />
						</div>
						<div>
							<div className={`${ns}-option-title mod-last`}>Inserted date-range:</div>
							<TimeRangeSelector startDate={this.state.insertedOnMin} endDate={this.state.insertedOnMax} handleChangeStart={this.createTimeRangeHandler('insertedOn')} handleChangeEnd={this.createTimeRangeHandler('insertedOn', false)} />
						</div>
					</div>
					<div className={`${ns}-option-group mod-last`}>
						{this.renderToggle('excludeInactive', 'Exclude Inactive Jobs')}
						{this.renderToggle('excludeInterested', 'Exclude Jobs in Interesting Stage')}
						{this.renderToggle('excludeRejected', 'Exclude rejected Jobs')}
					</div>
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
						<div className={`${ns}-numeric-wrap`}>
							<div className={`${ns}-numeric-item`}>
								<div>Total Jobs: {totalJobs}</div>
								<div>Active Jobs: {totalJobs - charts.misc.inactiveJobs}</div>
								<div>Inactive Jobs: {charts.misc.inactiveJobs}</div>
							</div>
							<div className={`${ns}-numeric-item`}>
								<div>Min salary: {totalJobs ? (charts.misc.minSalary / 1000) : '?'}K/y</div>
								<div>Max salary: {totalJobs ? (charts.misc.maxSalary / 1000) : '?'}K/y</div>
								<div>Avg salary: {totalJobs ? ((charts.misc.avgSalary / 1000).toFixed(0)) : '?'}K/y</div>
							</div>
							<div className={`${ns}-numeric-item`}>
								<div>Companies: {Object.keys(charts.misc.companies).length}</div>
								<div>Drop rate: {totalJobs ? ((charts.misc.dropped / totalJobs * 100).toFixed(0)) : '?'}%</div>
								<div>Inactive rate: {totalJobs ? ((charts.misc.inactiveJobs / totalJobs * 100).toFixed(0)) : '?'}%</div>
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
			maxInsertedDate     : 0,
			misc                : {
				totalJobs    : 0,
				inactiveJobs : 0,
				companies    : {},
				dropped      : 0,
				minSalary    : Infinity,
				maxSalary    : 0,
				avgSalary    : []
			}
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
				
				//MISC
				res.misc.totalJobs += 1;
				res.misc.companies[ job.company ] = 1;
				
				let salary = +job.salary;
				
				if ( salary < res.misc.minSalary ) {
					res.misc.minSalary = salary;
				}
				if ( salary > res.misc.maxSalary ) {
					res.misc.maxSalary = salary;
				}
				res.misc.avgSalary.push(salary);
				
				if ( [ 7, 8 ].indexOf(+job.stageCode) !== -1 ) {
					res.misc.dropped += 1;
				}
				
				if ( utils.isJobStalled(job, this.props.user.data.configuration.nrpl) ) {
					res.misc.inactiveJobs += 1;
				}
				
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
		
		//MISC
		const avgSalaryLength = res.misc.avgSalary.length;
		res.misc.avgSalary    = res.misc.avgSalary.reduce(( acc, e ) =>{
			return acc + Number(e);
		}, 0);
		res.misc.avgSalary /= avgSalaryLength;
		
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
		
		if ( job.insertedOn < this.state.insertedOnMin || job.insertedOn > this.state.insertedOnMax ) {
			return false;
		}
		
		if ( job.lastContactOn < this.state.lastContactMin || job.lastContactOn > this.state.lastContactMax ) {
			return false;
		}
		
		return true;
		
	}
	
	renderChart( name, type = false, chartData, options = {} ){
		
		
		const chooseChart = () =>{
			
			if ( (typeof chartData.data === 'array' && !chartData.length) || (typeof chartData.data === 'object' && !Object.keys(chartData.data).length) ) {
				return <div className={`${ns}-chart-nodata`}>no data available</div>;
			}
			
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
							   <Area key={i} type="monotone" dataKey={e} stackId="1" stroke={utils.generateLegendColor(i, tot, this.state.salt)} fillOpacity={1} fill={`url(#color${i})`} />)}
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
	
	createTimeRangeHandler( stateKey, isStart = true ){
		
		const minKey = stateKey + 'Min';
		const maxKey = stateKey + 'Max';
		
		return ( date ) =>{
			
			const oldMin  = this.state[ minKey ];
			const oldMax  = this.state[ maxKey ];
			let newMin    = oldMin;
			let newMax    = oldMax;
			const current = isStart ? +date.startOf('date') : +date.endOf('date');
			
			isStart ? newMin = current : newMax = current;
			
			if ( isStart ) {
				
				if ( current > oldMax ) {
					
					newMin = oldMax;
					newMax = current;
					
				}
				
			} else {
				
				if ( current < oldMin ) {
					
					newMin = current;
					newMax = oldMin;
					
				}
				
			}
			
			this.setState({
							  [minKey] : newMin,
							  [maxKey] : newMax
						  });
			
		};
		
	}
	
}


export default connect(( {user} ) =>{
	return {
		user
	};
}, null)(InsightsView);