let{
    TextField,
    RaisedButton
} = MUI;



ItemView = React.createClass({
    
    mixins: [ReactMeteorData],

    getMeteorData() {

	return {
	    foodItem: (FoodItemsC.find({_id: this.props.params.itemID}).fetch()[0])
	};
	
    },

    getInitialState(){
	return{
	    commentText:""
	}
    },

    renderComments(){
	if (this.data.foodItem.comments){
	    return this.data.foodItem.comments.map((comment) => {
		return(
		    <div>
		       	<Comment
		       	    comment={comment.comment}
		       	    date={comment.createdAt.toString()}
		       	    username={comment.username}
		       	/>
		       	<br />
		    </div>)
	    });
	}
	
    },
    handleComment(event){
	this.setState({
	    commentText : event.target.value,
	});
    },

    addComment(event) {
	event.preventDefault();
	var comment = this.state.commentText
	console.log(this.state.commentText);
	FoodItemsC.update({_id: this.data.foodItem._id},{$push : {
	    comments:{
		username: Meteor.user().username,
		comment: comment,
		createdAt: new Date()
	    }
	}});

	this.setState({commentText:null});
	console.log(this.state.commentText);


    },

    render : function () {
	return (
	    <div>

	 	<FoodItems key={this.data.foodItem._id} foodItem={this.data.foodItem}/><br />

		<TextField hintText="You can leave a comment here" onChange={this.handleComment} value={this.state.commentText}/><br />

		<RaisedButton label="Submit" primary={true} onTouchTap={this.addComment} /><br /><br />

		{this.renderComments()}

	    </div>
	);
    }
});
