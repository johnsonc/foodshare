import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
    List,
    ListItem,
    Avatar,
    Drawer
} from 'material-ui';

import Colors from 'material-ui/styles';

import SvgIcons from 'material-ui/svg-icons';

import PrivateChat from './PrivateChat.jsx';
import TimeSince from './TimeSince.jsx';

const MessageBar = React.createClass({

    mixins: [ReactMeteorData],

    getInitialState(){
	    return{
			openNav: false,
			userCurr: "noone",
	    }
	},

	getMeteorData: function(){
		   
		currentUser = Meteor.user() ? Meteor.user().username : '';
		Meteor.subscribe("sidebar", currentUser);
			return {
			    currentUser: currentUser,
			    privateMessages: clientSidebar.find().fetch()
			};

    },

    renderMessagesList: function(){
		if(this.data.privateMessages){
		    return this.data.privateMessages.map((message) => {
		  	       otherUser = message.between.slice();
		               otherUser.splice(otherUser.indexOf(this.data.currentUser),1)
			       item = 
					<ListItem	
				        leftAvatar={<Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png"/>}
						
						rightIconButton={
							!message.seen && message.username != this.data.currentUser ? <SvgIcons.CommunicationChatBubble /> : ''
						}
						onTouchTap={
							this.openPmess(otherUser[0])
						}
						primaryText={message.between[1]}
						secondaryText={
						    <div>
							<span style={{color: Colors.darkBlack}}>{this.calcTime(message.createdAt)}</span><br/>
							{message.message}
						    </div>
						}
						secondaryTextLines={2}

					/>
				
				return(item)
		    });
		}else{ <div className="vertAlign">You have no messages! Go share some food :)</div>}
	},

	calcTime: function(date){
		return(
			<TimeSince time={date} />
			);
	},

	openPmess: function(currUs) {
		var that = this;
  		handleOpen = function(event) {
  			that.setState({openNav: true, userCurr: currUs});
			}
	  return handleOpen
	},

    handleCloseNav: function () {
    	this.setState({openNav: false});
    },

    compoentWillUpdate(){
    	this.forceUpdate();
    },

    render : function(){
    	var winWidth = window.innerWidth*0.83;
	return(
		<div>
		<div style={{height: '64px'}}></div>
		    <List>
			{this.renderMessagesList()}
		    </List>
		    <div id='drawerContainerDIv'>
				<Drawer
					containerClassName='containerRoot'
					width={winWidth}
					openSecondary={true}
					open={this.state.openNav}
					docked={false}
					onRequestChange={this.handleCloseNav}
				>
					<PrivateChat messagedUsername={this.state.userCurr} />
				</Drawer>
			</div>
		</div>
	);

    }

});
export default MessageBar;