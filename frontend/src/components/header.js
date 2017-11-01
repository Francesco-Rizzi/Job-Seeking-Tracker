import React, {Component} from 'react';
import {Link} from 'react-router';

const ns = 'jst-header';

export default class Header extends Component {
	render(){
		return (
			<header className={ns}>
				<div className={ns + '-container container'}>
					<Link to='/'><span className={ns + '-logo'}><span className={ns + '-logo-icon'}>👔</span> #JST</span></Link>
					<nav>
						<ul >
							<li>
								<Link activeClassName='active' to='/app' className={ns + '-link'}>App</Link>
								<Link activeClassName='active' to='/features' className={ns + '-link'}>Features</Link>
								<Link activeClassName='active' to='/about' className={ns + '-link'}>About</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		);
	}
}
