import React, {Component} from 'react';
import utils from './../utils/utils';

const ns   = 'jst-notifications';
let timers = [];

export default class Notifications extends Component {
	
	constructor( props ){
		super(props);
		this.state = {notifications : []};
	}
	
	render(){
		const {notifications} = this.state;
		if ( notifications.length ) {
			return <div className={`${ns}-wrapper`}>{notifications.map(( e, i ) =>
																		   <div key={i} className={`${ns} mod-${e.type}`}>{e.message}</div>)}</div>;
		} else {
			return <div></div>;
		}
	}
	
	addNotification = ( e ) =>{
		
		const {notifications}  = this.state;
		const newNotifications = [ ...notifications ];
		newNotifications.push(e.detail);
		this.setState({notifications : newNotifications}); //FIFO
		
		timers.push(setTimeout(() =>{
			const {notifications}  = this.state;
			const newNotifications = [ ...notifications ];
			newNotifications.shift();
			this.setState({notifications : newNotifications});
		}, 1000 * 5)); //5 seconds messages
		
	};
	
	componentWillMount(){
		window.addEventListener('userNotification', this.addNotification, false);
	}
	
	componentWillUnmount(){
		window.removeEventListener('userNotification', this.addNotification, false);
		timers = [];
	}
	
}
