import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
    ActionInfo,
    List,
    ListItem,
    Divider,
    IconButton,
    Styles,
    MoreVertIcon,
    IconMenu,
    MenuItem,
    Avatar,
    FlatButton,
    Dialog
} from 'material-ui';

import {
    Colors
} from 'material-ui';

import { 
    green900
} from 'material-ui/styles/colors';

import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import ContentBlock from 'material-ui/svg-icons/content/block';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';

const claimContentStyle = {
    width: '100%',
    maxWidth: 'none',
};

Request = React.createClass({

    getInitialState(){
	return{
	    openAccept: false,
	    openReject: false,
	    prtNo: 0,
	    userName: "",
	    claimId: "",
	    date: "",
	}
    },

    generateRequests(){
	if(this.props.claims){
	    return this.props.claims.map((claim) => {

		return (
		    <div>
			{ claim.rejected ?
			  ""
			  :
			  <div>
			      { claim.accepted == 0 ?
				<div>
				    <ListItem
                        primaryText={claim.username}
                        secondaryText={"Has requested " + claim.portions + " portions"}
                        leftAvatar={<Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
             				 	key={1}
             				 	primaryText="Accept"
             				 	leftIcon={<ActionCheckCircle color='Green'/>}
             				 	onTouchTap={this.getAcceptHandler(claim)}
                            />,
                            <ListItem
             				 	key={2}
             				 	primaryText="Reject"
             				 	leftIcon={<ContentBlock color='Red'/>}
             				 	onTouchTap={this.getRejectHandler(claim)}
                            />,
                        ]}
                    />
				    <Divider />
				</div>
				:
				<div>
				    <ListItem
                        primaryText={claim.username}
                        secondaryText={"You have accepted " + claim.accepted + " out of " + claim.portions + " requested portions"}
                        leftAvatar={<Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />}
                        rightIcon={<CommunicationChat />}
                        onTouchTap={this.getChatHandler(claim)}
                    />
				    <Divider />
				</div>
			      }
			  </div>
			}
		    </div>
		);
	    });
	}
    },

    getChatHandler: function(claim) {
  	handleChat = (function(event) {
            this.props.openMessages(claim.username)
	}).bind(this)
	return handleChat
    },

    getAcceptHandler: function(claim) {
	var that = this;
  	handleAccept = function(event) {
	    that.setState({
		prtNo: claim.portions,
		userName: claim.username,
		claimId: claim.parentId,
		date: claim.createdAt,
		openAccept: true,
	    });
	}
	return handleAccept
    },

    getRejectHandler: function(claim) {
	var that = this;
  	handleReject = function(event) {
	    that.setState({
		prtNo: claim.portions,
		userName: claim.username,
		claimId: claim.parentId,
		date: claim.createdAt,
		openReject: true,
	    });
	}
	return handleReject
    },

    getCloseHandler: function(popType, reject) {
	var that = this;
	handleClose = function(event) {
	    if (popType == "accept"){
		that.setState({openAccept: false});
	    }
	    if (popType == "reject"){
		if(reject){
		    Meteor.call('rejectClaim', that.state.claimId, that.state.userName, that.state.date)
		}
		that.setState({openReject: false});
	    }
	}
	return handleClose
    },

    render(){

	const acceptActions = [     
	    <ClaimControl 
                id={this.state.claimId}
                accept={true}
                username={this.state.userName}
                portionsLeft={this.state.prtNo}
                finishIt={this.getCloseHandler("accept", false)}
            />,
	    <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.getCloseHandler("accept", false)}
            />,
	];

	const rejectActions = [     
	    <FlatButton
                label="Reject Claim!"
                primary={true}
                onTouchTap={this.getCloseHandler("reject", true)}
            />,
	    <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.getCloseHandler("reject", false)}
            />,
	];


	return(
	    <div>
		<List>
		    <Divider />
		    {this.generateRequests()}
		</List>
		<Dialog
                    title="Accept"
                    actions={acceptActions}
                    modal={true}
                    contentStyle={claimContentStyle}
                    open={this.state.openAccept}
		>
		    How many portions do you wish to accept?
		</Dialog>
		<Dialog
                    title="Reject"
                    actions={rejectActions}
                    modal={true}
                    contentStyle={claimContentStyle}
                    open={this.state.openReject}
		>
		    Do you really want to reject this claim?
		</Dialog>
	    </div>
	);
    }

});