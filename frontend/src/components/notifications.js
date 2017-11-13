import React, {Component} from 'react';
import utils from './../utils/utils';

const ns     = 'jst-notification';
const timers = [];

export default class Notifications extends Component {
	
	constructor( props ){
		super(props);
		this.state = {notifications : []};
	}
	
	render(){
		const {notifications} = this.state;
		const isLogged = this.props;
		if ( notifications.length ) {
			return <div className={`${ns}-wrapper ${isLogged ? 'mod-logged' : ''}`}>
				{notifications.map(( e, i ) =>
									   <div key={i} className={`${ns} mod-${e.type} ${e.isRemoved ? 'is-removed' : ''}`}>{e.message}
									   </div>)}
			</div>;
		} else {
			return <div></div>;
		}
	}
	
	addNotification = ( e ) =>{
		
		const {notifications} = this.state;
		let newNotifications  = [ ...notifications ];
		newNotifications.push(e.detail);
		const ID = newNotifications.length - 1;
		
		this.setState({notifications : newNotifications}); //FIFO Stack
		
		setTimeout((function( id ){
			
			return function(){
				
				//Animation stuff
				const DOMElement = document.querySelector(`.jst-notification-wrapper .jst-notification:nth-child(${id + 1})`);
				
				DOMElement.style.height = DOMElement.clientHeight + 'px';
				
			};
			
		})(ID), 0);
		
		const timer = setTimeout((function( id, that ){
			
			return function(){
				
				const {notifications}            = that.state;
				const newNotifications           = [ ...notifications ];
				newNotifications[ id ].isRemoved = true;
				
				that.setState({notifications : newNotifications});
				
			};
			
		})(ID, this), 1000 * 5); //5 seconds messages
		timers.push(timer);
		
	};
	
	componentWillMount(){
		window.addEventListener('userNotification', this.addNotification, false);
	}
	
	componentWillUnmount(){
		window.removeEventListener('userNotification', this.addNotification, false);
		timers.forEach(t => clearTimeout(t));
	}
	
}
