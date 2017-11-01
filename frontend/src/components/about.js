import React, {Component} from 'react';


const ns = 'jst-about';

export default class About extends Component {
	
	render(){
		
		return (
			<div className={ns}>
				<h1>About the author:</h1>
				<h3>DESC this
					
					I'm Francesco, if you want to discover some more stuff about me, check out these links: <a href="/" target="_blank" title="Personal website">my website</a>, <a target="_blank" href="https://github.com/Francesco-Rizzi" title="GitHub profile">GitHub</a>, <a target="_blank" href="https://www.linkedin.com/in/francesco-rizzi-199524a5/" title="LinkedIn profile">LinkedIn</a>, <a target="_blank" href="https://twitter.com/0xFFrancesco" title="Twitter profile">Twitter @0xFFrancesco</a>, <a target="_blank" href="https://www.instagram.com/finallyfrancesco/" title="Instagram profile">Instagram @finallyfrancesco</a>.
				</h3>
				<h2>About the App:</h2>
				<h3>
					I build this SaaS from scratch, the backend is mainly a LAMP based stack which provides APIs for storing and retrieving data as well as registering and authenticating users (JWT auth).
					
					The frontend is a SPA (Single-Page-App) based on React and Redux.
					
					The compilation and bundling of the JS stuff is done with Webpack, creating two bundles for Custom end Vendor code along with using name hashing for cache management.
				</h3>
				<h4>Frontend (React Single-Page-App):</h4>
				<ul>
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
					<li>Webpack (+ vendor splitting)</li>
					<li>Babel</li>
					<li>NPM 📦</li>
				</ul>
				<h4>Backend (LAMP, JWT auth):</h4>
				<ul>
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
