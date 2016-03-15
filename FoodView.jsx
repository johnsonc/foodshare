FoodView = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
 
  getInitialState() {
    return {
      filter : '',
    }
  },

  // Loads items from the FoodItems collection and puts them on this.data.foodItems
  getMeteorData() {

    currentUser = Meteor.user()
  
    queryS = '.*'+this.state.filter+'.*';

    if (this.props.location.pathname=='/Messages'){
       listMessageQuery = {username : {'$eq' : currentUser.username}};
    } else {
       listMessageQuery = {username : {'$ne' : currentUser.username}};
    }
    console.log(listMessageQuery);
    console.log(currentUser);
    filterQuery = {foodName : {'$regex' : queryS}};

    
    return {
      foodItems: FoodItemsC.find({'$and' : [filterQuery, listMessageQuery]}, {sort: {createdAt: -1}}).fetch(),
      currentUser: currentUser
    };
  },

  filterList(event) {
    //Change the state of the filtering in play
    this.setState({
      filter: event.target.value
    });
  },

  renderFoodItems() {
    // Get foodItems from this.data.foodItems
    return this.data.foodItems.map((foodItem) => {
      return <FoodItems key={foodItem._id} foodItem={foodItem} />;   
    });
  },



  render: function() {
    console.log(this.props.location.pathname=='/Messages')
    return (
	<div>

	<input type="text" placeholder="Search" onChange={this.filterList}/>
	<table className="itemListView">
		{this.renderFoodItems()} 
  </table>
	</div>


    );
  }
});
