import React, {Component} from 'react';

const ns = 'jst-loader';

export default class Loader extends Component {
	
	render(){
		
		return <span className={`${ns}`}>
					<div className="lds-css">
						<div className="lds-grid">
							<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
						</div>
					</div>
				</span>;
		
		
	}
	
}