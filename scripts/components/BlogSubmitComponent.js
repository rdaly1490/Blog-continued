var React = require('react');
var _ = require("underscore");

var PostModel = require("../models/BlogPostModel")

module.exports = React.createClass({
	getInitialState: function() {
		return {
			errors: {}
		}
	},
	render: function() {
		return (
			<div className="container-fluid">
				<div className="col-sm-8 col-sm-offset-2 submit-post welcome">
					<form>
						<label>Blog Title</label><br />
						<input type="text" placeholder="Title" ref="title" />
						<p></p>
						<label>Blog Body</label><br />
						<textarea ref="body" placeholder="Body...."></textarea>
						<p></p>
						<label>Blog Category</label><br />
						<select ref="category">
							<option value="">--Choose an option--</option>
							<option value="javascript">JavaScript</option>
							<option value="ruby">Ruby</option>
							<option value="node">Node</option>
							<option value="random">Random</option>
						</select><br />
						<button onClick={this.submitPost}>Submit Post</button>
					</form>
				</div>
			</div>
		);
	},
	submitPost: function(e) {
		e.preventDefault();
		var that = this;
		var post = new PostModel ({
			title:this.refs.title.getDOMNode().value,
			body: this.refs.body.getDOMNode().value,
			category: this.refs.category.getDOMNode().value,
			userId: this.props.user.attributes.username
		});
		post.save(null,
			{
				success: function(model) {
					var postId = model.attributes.objectId;
					that.props.myRouter.navigate("post/"+postId, {trigger:true});
				},
				error: function(model) {
					console.log("Doesn't work");
				}
			}
		);
	}
});



// regex: .*first*.
// . will match every character
// * will 