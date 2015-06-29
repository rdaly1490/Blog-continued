var React = require('react');
var _ = require("underscore");
var $ = require("jquery");
var moment = require('moment');

var BlogPostCollection = require("../collections/BlogPostCollection");

module.exports = React.createClass({
	getInitialState: function() {
		var query = {};
		query[this.props.choice] = {$regex: ".*"+this.props.query+".*"}
		var that = this;
		console.log(this.props.query)
		var SearchResults = new BlogPostCollection();
		SearchResults.fetch({
			query: query,

			success: function() {
				that.forceUpdate();
			}
		});

		return {
			searchResults:SearchResults
		}
	},
	render: function() {

		var sortedModels = this.state.searchResults.sortBy(function(postModel) {
			return (-1*(new Date(postModel.attributes.createdAt).getTime()));
		});

		var topTenModels = _.first(sortedModels, 10);

		if(this.state.searchResults.length>0) {
			var results = topTenModels.map(function(model) {
				return (
					<div className="col-sm-8 col-sm-offset-2 posts" key={model.cid}>
						<h3>{model.get("title")}</h3>
						<p> {moment(model.get("createdAt")).format("MMM Do YY")}</p>
						<p>{model.get("body")}</p>
						<p> Category: {model.get("category")} || Posted By: {model.get("userId")} </p>
					</div>
				);
			});
		}
		else {
			var results = <h1>No results found</h1>
		}

		return (
			<div className="col-sm-8 col-sm-offset-2 welcome">
				<div>{results}</div>
				<button onClick={this.goHome}>Go Home</button>
			</div>
		);
	},
	goHome: function(e) {
		e.preventDefault();
		this.props.myRouter.navigate("home", {trigger: true});
	}
});