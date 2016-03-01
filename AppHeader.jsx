var {
    AppCanvas,
    AppBar,
    Styles,
    RaisedButton,
    IconMenu,
    IconButton,
    MenuItem,
    MoreVertIcon,
    TextField,
    NavigationClose,
    Avatar,
    DatePicker,
    Tabs,
    Tab,
    Slider,
    FlatButton,
    FontIcon,
    AppBar,
    IconButton,
    NavigationClose,
    IconMenu,
    MoreVertIcon,
    MenuItem
    } = MUI;

    var {SvgIcons} = MUI.Libs;
   
var { ThemeManager, LightRawTheme } = Styles;

const {Link} = ReactRouter;

AppHeader = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
 
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },

    render : function(){
	    return(



		<div className="container">

			<div className="contentContain">
				{this.props.children} 
			</div>

			<div className="headContain">
				<AppBar
				    title="Food Sharing"
				    iconElementLeft={<AccountsUIWrapper />}
				    iconElementRight={

							<IconButton containerElement={<Link to={'/ItemCreation'} />} linkButton={true}>
		          					<SvgIcons.ContentAddCircle color='Green'/>
		          				</IconButton>
		        			}
					        targetOrigin={{horizontal: 'right', vertical: 'top'}}
		  		/>
		  	</div>


		    <div className="tabsContain">
				<FlatButton label="List"
					containerElement={<Link to={'/'} />}
					linkButton={true}
					labelPosition="before"
					primary={true}
				/>


				<FlatButton label="Map"
					containerElement={<Link to={'/MapView'} />}
					linkButton={true}
					labelPosition="before"
					primary={true}
				/>

				<FlatButton label="Messages"
					containerElement={<Link to={'/PrivateChat'} />}
					linkButton={true}
					labelPosition="before"
					primary={true}
				/>

			</div>

		</div>    
	    );

    }

})	 
