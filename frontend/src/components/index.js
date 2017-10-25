import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Features from './features';
import App from './app';
import Structure from './structure';
import Intro from './intro';

export default class Index extends Component {
	render(){
		return (
			<Router history={browserHistory}>
				<Route path='/' component={Structure}>
					<Route path='/app' component={App} />
					<Route path='/features' component={Features} />
					<IndexRoute component={Intro} />
				</Route>
			</Router>
		);
	}
}
