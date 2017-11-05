import React, {Component} from 'react';

const ns = 'jst-app-logic-header';

export default class Header extends Component {
	render(){
		return (
			<header className={ns}>
				<nav>
					<ul>
						<li key='1'>
							<a >Data</a>
						</li>
						<li key='2'>
							<a >Insights</a>
						</li>
						<li key='3'>
							<a >Config</a>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}
