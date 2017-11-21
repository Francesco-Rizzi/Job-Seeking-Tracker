import React, {Component} from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import utils from './../../utils/utils';
import moment from 'moment';
import ReactStars from 'react-stars';
import ReactTooltip from 'react-tooltip';

const ns = 'jst-app-logic-view-data-job';

export default class DataViewJob extends Component {
	
	constructor( props ){
		super(props);
		this.state = {detailMode : false};
	}
	
	render(){
		
		const {job, rankingConf} = this.props;
		const id                 = utils.getJobID(job);
		const rank               = utils.getJobRank(job, rankingConf);
		
		return (
			<div className={`${ns}-item`}>
				
				<div className={`${ns}-overview`}>
					
					<div className={`${ns}-right`}>
						
						<div className={`${ns}-overview-rank mod-${rank.toLowerCase()}`} data-tip data-for={id}>
							<b className={`${ns}-rank `}>{rank}</b>
						</div>
						<ReactTooltip id={id} place="right" type="dark" effect="float">
							<div>The rank for this position computed<br />by The Company Ranker is <b>{rank}</b>.</div>
						</ReactTooltip>
						
						<div className={`${ns}-overview-text`}>
							<div>
								<b>{job.role}</b> at <b>{job.company}</b> in <b>{job.location}</b>
							</div>
							<div>
								<span className={`${ns}-see-details`} onClick={() => this.setState({detailMode : !this.state.detailMode})}><i>{!this.state.detailMode ? 'see' : 'hide'} details</i></span>
								{this.renderLink(job)}
							</div>
						
						</div>
					</div>
					
					{this.renderActions('desktop', id)}
				
				</div>
				
				<SmoothCollapse expanded={this.state.detailMode}>
					<div className={`${ns}-details`}>
						
						{/*<div className={`${ns}-title`}>Full data:</div>*/}
						
						<div className={`${ns}-detail-group`}>
							<div className={`${ns}-detail-field`}>Salary: {job.salary}K/y</div>
							<div className={`${ns}-detail-field mod-date`}>Inserted: {moment(job.insertedOn).format('DD/MM/YYYY')} ({moment(job.insertedOn).fromNow()})</div>
						</div>
						
						<div className={`${ns}-detail-group`}>
							<div className={`${ns}-detail-field`}>Equity: {job.equity}%</div>
							<div className={`${ns}-detail-field mod-date`}>Last contact: {moment(job.lastContactOn).format('DD/MM/YYYY')} ({moment(job.lastContactOn).fromNow()})</div>
						</div>
						
						<div className={`${ns}-detail-group mod-rating`}>
							{this.renderRating('Benefits', 'fpk3')}
							{this.renderRating('Current traction', 'pic1')}
							{this.renderRating('Founder\'s strength', 'pic2')}
							{this.renderRating('Growth rate', 'pic3')}
							{this.renderRating('Employees retention', 'pic4')}
							{this.renderRating('Career opportunities', 'pic5')}
							{this.renderRating('Learning opportunities', 'poc1')}
							{this.renderRating('Company size and reputation', 'poc2')}
							{this.renderRating('Team composition', 'ppr1')}
							{this.renderRating('Location', 'ppr2')}
							{this.renderRating('Culture', 'ppr3')}
						</div>
					
					</div>
				</SmoothCollapse>
				
				{this.renderActions('mobile', id)}
			
			</div>
		);
		
	}
	
	renderRating( name, code ){
		const val = this.props.job.rankings ? (this.props.job.rankings[ code ] / 2 || 0) : 0;
		return (<div className={`${ns}-detail-field mod-rating`}>{name}:
			<ReactStars color1={'#888888'} color2={'#e6c304'} value={val} edit={false} /></div>);
	}
	
	renderLink( job ){
		if ( job.link ) {
			return (<span className={`${ns}-link`}><a href={job.link} target='_blank'><i>job link</i></a></span>);
		}
		return false;
	}
	
	renderActions( mod, id ){
		return (
			<div className={`${ns}-overview-actions mod-${mod}`}>
				<button className={`${ns}-action jst-button-danger mod-small`} onClick={() => this.props.onRemove(id)}>Remove</button>
				<button className={`${ns}-action jst-button-primary mod-small mod-space-left`} onClick={() => this.props.onEdit(id)}>Edit</button>
			</div>
		);
	}
	
}