import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Features from './features';
import App from './app';
import Structure from './structure';
import Intro from './intro';
import About from './about';
import TheCompanyRankerPage from './the-company-ranker-page';

export default class Index extends Component {
	render(){
		return (
			<Router history={browserHistory}>
				<Route path='/' component={Structure}>
					<Route title={getTitle('App')} path='/app' component={App} />
					<Route title={getTitle('Features')} path='/features' component={Features} />
					<Route title={'The Company Ranker | Job Seeking Tracker | Francesco Rizzi'} path='/features/the-company-ranker' component={TheCompanyRankerPage} />
					<Route title={getTitle('About')} path='/about' component={About} />
					<IndexRoute title={getTitle()} component={Intro} />
				</Route>
			</Router>
		);
	}
}

function getTitle( section ){
	return section ? `Job Seeking Tracker ${section} | Francesco Rizzi` : `Job Seeking Tracker | Francesco Rizzi`;
}