var React = require('react');
var _ = require("underscore");
var $ = require("jquery");
var moment = require('moment');

var BlogPostCollection = require("../collections/BlogPostCollection");

module.exports = React.createClass({
	getInitialState: function() {

		var that=this;

		var BlogHistory = new BlogPostCollection();
		BlogHistory.fetch({
			success: function() {
				that.forceUpdate();
			}
		});

		BlogHistory.on("sync", function() {
			that.forceUpdate();
		});

		return {
			errors: {},
			blogHistory: BlogHistory
		}
	},
	componentWillMount: function() {
		var that=this;
		this.props.user.on("change", function() {
			that.forceUpdate();
		});
	},
	render: function() {
		var sortedModels = this.state.blogHistory.sortBy(function(postModel) {
			return (-1*(new Date(postModel.attributes.createdAt).getTime()));
		});

		var topTenModels = _.first(sortedModels, 10);

		var blogFeedHome = topTenModels.map(function(blogModel) {
			return (
				<div className="col-sm-10 col-sm-offset-1 posts" key={blogModel.cid}>
					<h3>{blogModel.get("title")}</h3>
					<p> {moment(blogModel.get("createdAt")).format("MMM Do YY")}</p>
					<p>{blogModel.get("body")}</p>
					<p> Category: {blogModel.get("category")} || Posted By: {blogModel.get("userId")} </p>
				</div>
			);
		});

		return (
			<div className="container-fluid">
				<div className="col-sm-8 col-sm-offset-3 welcome">
					<div> {blogFeedHome} </div>
				</div>
			</div>
		);
	}
});