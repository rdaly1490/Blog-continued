var React = require('react');
var _ = require("underscore");
var $ = require("jquery");
var moment = require('moment');

var postModel = require("../models/BlogPostModel")

module.exports = React.createClass({
	getInitialState: function() {
		var that = this;
		var post = new postModel({
			objectId: this.props.postId 
		});
		post.fetch();

		post.on("change", function() {
			that.forceUpdate();
		});
		return {
			post: post
		}
	},
	render: function() {
		return (
			<div className="col-sm-8 col-sm-offset-2 welcome posts">
				<h3> {this.state.post.get("title")}</h3>
				<p> {moment(this.state.post.get("createdAt")).format("MMM Do YY")}</p>
				<p> {this.state.post.get("body")}</p>
				<p> Category: {this.state.post.get("category")} || Posted By: {this.state.post.get("userId")}</p>
				<button onClick={this.goHome}>Go Home</button>
			</div>
		);
	},
	goHome: function() {
		this.props.myRouter.navigate("home", {trigger:true});
	}
});