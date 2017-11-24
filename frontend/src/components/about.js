import React, {Component} from 'react';


const ns = 'jst-about';

export default class About extends Component {
	
	render(){
		
		return (
			<div className={ns}>
				
				<div className={`${ns}-page-title`}>About</div>
				
				<h1 className={`${ns}-title`}>About the author:</h1>
				<div className={`${ns}-img-wrap`}>
					<img src='/libs/assets/images/Francesco-Rizzi-picture.png' alt='Francesco-Rizzi-picture' title='Francesco Rizzi picture' />
					<h2 className={`${ns}-desc`}>I'm Francesco, if you want to discover some more stuff about me, check out these links: <a href="http://francescorizzi.info/" target="_blank" title="Personal website">my website</a>, <a target="_blank" href="https://github.com/Francesco-Rizzi" title="GitHub profile">GitHub</a>, <a target="_blank" href="https://www.linkedin.com/in/francesco-rizzi-199524a5/" title="LinkedIn profile">LinkedIn</a>, <a target="_blank" href="https://twitter.com/0xFFrancesco" title="Twitter profile">Twitter @0xFFrancesco</a>, <a target="_blank" href="https://www.instagram.com/finallyfrancesco/" title="Instagram profile">Instagram @finallyfrancesco</a>, <a href='https://medium.com/@francesco_rizzi' target='_blank'>Medium</a>.
					</h2>
				</div>
				
				<h3 className={`${ns}-title mod-space-top`}>About the app:</h3>
				
				<h4 className={`${ns}-desc`}>
					I have built this Web App from scratch, managing the full process: <i>concept</i> + <i>design</i> + <i>user experience</i> + <i>architecture</i> + <i>backend</i> + <i>frontend</i> + <i>deploy</i>, and I'm pretty proud of it :). <b>Why Job Seeking Tracker? To solve a problem!</b> Easily and effectively track my job seeking activity, get visual insights from the data and, most important, take the best decision on choosing a company evaluating many different traits <i>tailored on my preferences</i>. Check out how <a href="/features/the-company-ranker" target="_blank">The Company Ranker</a> works!
					
					The backend is mainly a LAMP based stack which provides APIs for storing and retrieving data as well as registering and authenticating users (JWT authentication).
					
					The frontend is a SPA (Single-Page-App) based on React and Redux (+ many other UI/UX libraries, see below).
					
					The transpilation and bundling of the JavaScript stuff is made via Webpack, creating two bundles for <i>Custom</i> end <i>Vendor</i> code, along with using file-name-hashing for cache-busting management.
					
					Interested in the source code? It is publicly available, check it out on its <a href="https://github.com/Francesco-Rizzi/Job-Seeking-Tracker" target="_blank">GitHub repo</a> !
				</h4>
				
				<h4 className={`${ns}-list-title`}>Frontend (React Single-Page-App):</h4>
				<ul className={`${ns}-list`}>
					<li>JavaScript (ES6+)</li>
					<li>JSX</li>
					<li>React ⚛</li>
					<li>React-router</li>
					<li>React-slider</li>
					<li>React-stars</li>
					<li>React-smooth-collapse</li>
					<li>React-datepicker</li>
					<li>React-tooltip</li>
					<li>React-toggle-button</li>
					<li><a href='http://recharts.org/' target='_blank'>Recharts</a> (React charting library based on D3.js)</li>
					<li>Redux 🔃</li>
					<li>Redux-thunk</li>
					<li>Redux-form</li>
					<li>Axios</li>
					<li>Lodash</li>
					<li>Moment</li>
					<li>
						<a href='https://github.com/Francesco-Rizzi/Math.mapRange' target='_blank'>Math.mapRange</a> (Math enhancer)
					</li>
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
					<li><a href='http://www.doctrine-project.org/projects/dbal.html' target='_blank'>Doctrine DBAL</a> (Database Abstaction Layer)
					</li>
					<li>Composer</li>
					<li>Linux 🐧</li>
					<li>Apache</li>
					<li>HTACCESS</li>
					<li>SSL</li>
				</ul>
			</div>
		);
		
	}
	
};
