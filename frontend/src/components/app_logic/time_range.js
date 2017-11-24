import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const ns = 'jst-app-time-range-selector';

class TimeRangeSelector extends Component {
	
	render(){
		
		const endDate   = moment(this.props.endDate);
		const startDate = moment(this.props.startDate);
		
		return (
			<div className={`${ns}`}>
				<div className={`${ns}-group`}>
					<span className={`${ns}-span`}>From</span>
					<div className={`${ns}-datepicker`}>
						<DatePicker selected={startDate} selectsStart startDate={startDate} endDate={endDate} dateFormat={'DD MMMM YYYY'} onChange={this.props.handleChangeStart} />
					</div>
				</div>
				<div className={`${ns}-group`}>
					<span className={`${ns}-span`}>to</span>
					<div className={`${ns}-datepicker`}>
						<DatePicker selected={endDate} selectsEnd startDate={startDate} endDate={endDate} dateFormat={'DD MMMM YYYY'} onChange={this.props.handleChangeEnd} />
					</div>
				</div>
			</div>
		);
		
	}
	
}

export default TimeRangeSelector;