import React, {Component} from 'react';
import Header from './header';

const ns = 'jst-structure';

export default class Structure extends Component {
	render(){
		const title    = this.props.children.props.route.title;
		document.title = title;
		return (
			<div>
				<Header />
				<div className="body-wrapper">
					<div className="container">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
