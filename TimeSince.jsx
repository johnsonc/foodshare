import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

const TimeSince = React.createClass({

    calcTime(date) {
    	console.log(date)
	    var seconds = Math.floor((new Date() - date) / 1000);
	    console.log(seconds)
	    var interval = Math.floor(seconds / 31536000);

	    if (interval > 1) {
	        return interval + " yrs";
	    }
	    interval = Math.floor(seconds / 2592000);
	    if (interval > 1) {
	        return interval + " mths";
	    }
	    interval = Math.floor(seconds / 86400);
	    if (interval > 1) {
	        return interval + " days";
	    }
	    interval = Math.floor(seconds / 3600);
	    if (interval > 1) {
	        return interval + " hrs";
	    }
	    interval = Math.floor(seconds / 60);
	    if (interval > 1) {
	        return interval + " mins";
	    }
	    return Math.floor(seconds) + " secs";
	},

		render: function () {
			console.log(this.calcTime(this.props.time))
			return(
				<div>
					{this.calcTime(this.props.time)}
				</div>
				);
		}

});
export default TimeSince;