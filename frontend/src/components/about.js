import React, {Component} from 'react';


const ns = 'jst-about';

export default class About extends Component {
	
	render(){
		
		return (
			<div className={ns}>
				
				<div className={`${ns}-page-title`}>About</div>
				
				<h1 className={`${ns}-title`}>About the author:</h1>
				<h2 className={`${ns}-desc`}>I'm Francesco, if you want to discover some more stuff about me, check out these links: <a href="http://francescorizzi.info/" target="_blank" title="Personal website">my website</a>, <a target="_blank" href="https://github.com/Francesco-Rizzi" title="GitHub profile">GitHub</a>, <a target="_blank" href="https://www.linkedin.com/in/francesco-rizzi-199524a5/" title="LinkedIn profile">LinkedIn</a>, <a target="_blank" href="https://twitter.com/0xFFrancesco" title="Twitter profile">Twitter @0xFFrancesco</a>, <a target="_blank" href="https://www.instagram.com/finallyfrancesco/" title="Instagram profile">Instagram @finallyfrancesco</a>, <a href='https://medium.com/@francesco_rizzi' target='_blank'>Medium</a>.
				</h2>
				
				<h3 className={`${ns}-title mod-space-top`}>About the app:</h3>
				
				<h4 className={`${ns}-desc`}>
					I build this web app from scratch, the backend is mainly a LAMP based stack which provides APIs for storing and retrieving data as well as registering and authenticating users (JWT auth).
					
					The frontend is a SPA (Single-Page-App) based on React and Redux.
					
					The compilation and bundling of the JS stuff is done with Webpack, creating two bundles for <i>Custom</i> end <i>Vendor</i> code along with using name hashing for cache management.
				</h4>
				
				<h4 className={`${ns}-list-title`}>Frontend (React Single-Page-App):</h4>
				<ul className={`${ns}-list`}>
					<li>JavaScript</li>
					<li>React ⚛</li>
					<li>React-router</li>
					<li>Redux 🔃</li>
					<li>Redux-thunk</li>
					<li>Redux-form</li>
					<li>Lodash</li>
					<li>Axios</li>
					<li>CSS</li>
					<li>CSS variables</li>
					<li>SASS</li>
					<li>Webpack (<a href='https://webpack.js.org/guides/code-splitting/' target='_blank'>+ vendor splitting</a>)</li>
					<li>Babel</li>
					<li>NPM 📦</li>
				</ul>
				
				<h4 className={`${ns}-list-title`}>Backend (LAMP, JWT auth):</h4>
				<ul className={`${ns}-list`}>
					<li>PHP 🐘</li>
					<li>
						<a href='https://silex.symfony.com/' target='_blank'>Silex Framework</a> (a.k.a. Lightweight Symfony)
					</li>
					<li>MySQL</li>
					<li>Doctrine DBAL</li>
					<li>Composer</li>
					<li>Linux 🐧</li>
					<li>Apache</li>
					<li>HTACCESS</li>
				</ul>
			</div>
		);
		
	}
	
};
