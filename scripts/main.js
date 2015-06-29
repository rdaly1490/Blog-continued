var React = require('react');
var parseSettings = require("../config/parse");
var Backbone = require("backparse")(parseSettings)

var LoginPageComponent = require("./components/LoginPageComponent");
var RegisterPageComponent = require("./components/RegisterPageComponent");
var HomePageComponent = require("./components/HomePageComponent");
var BlogSubmitComponent = require("./components/BlogSubmitComponent");
var BlogPostComponent = require("./components/BlogPostComponent");
var SearchComponent = require("./components/SearchComponent");
var SearchResultsComponent = require("./components/SearchResultsComponent");
var NavigationComponent = require("./components/NavigationComponent");

var UserModel = require("./models/UserModel");

var user = new UserModel();

React.render(<NavigationComponent user={user} myRouter={myRouter} />, document.getElementById("navigation"));

var App = Backbone.Router.extend({
	routes: {
		"": "home",
		"login":"login",
		"register":"register",
		"home": "home",
		"submitpost": "submitpost",
		"post/:postId": "post",
		"searchresults/:query/:choice": "searchresults"
	},
	login: function() {
		React.render(
			<LoginPageComponent user={user} myRouter={myRouter} />,
			document.getElementById("container"));
	},
	register: function() {
		React.render(
			<RegisterPageComponent myRouter={myRouter} user={user} />,
			document.getElementById("container"));
	},
	home: function() {
		React.render(
			<div>
				<h1>Blog Post Feed</h1>
				<SearchComponent myRouter={myRouter} />
				<HomePageComponent user={user} myRouter={myRouter} />
			</div>,
			document.getElementById("container"));
	},
	submitpost: function() {
		React.render(
			<div>
				<h1>Submit Blog Post Page</h1>
				<BlogSubmitComponent user={user} myRouter={myRouter} />
			</div>,
			document.getElementById("container"));
	},
	post: function(postId) {
		React.render(
			<div>
				<h1>Post Page</h1>
				<BlogPostComponent user={user} myRouter={myRouter} postId={postId} />
			</div>,
			document.getElementById("container"));
	},
	searchresults: function(query, choice) {
				React.render(
			<div>
				<h1>Search Results Page</h1>
				<SearchResultsComponent user={user} myRouter={myRouter} query={query} choice={choice}/>
			</div>,
			document.getElementById("container"));
	}

});

var myRouter = new App();
Backbone.history.start();


user.me();


