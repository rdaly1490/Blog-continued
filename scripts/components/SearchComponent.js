var React = require('react');

module.exports = React.createClass({
	render: function() {
		var style = {
			position: "fixed"
		}
		return (
			<div style={style} className="col-sm-3 searchbar">
				<form onSubmit={this.searchQuery}>
					<label>Search</label><br />
					<input ref="search" type="text" placeholder="search" /><br />
					<label>User &nbsp;</label><input ref="userId" type="radio" name="choice" value="userId" /> <br />
					<label>Title &nbsp;</label><input defaultChecked ref="title" type="radio" name="choice" value="title" /> <br />
					<button>Search</button>
				</form>
				<div className="col-sm-12">
					<h5>Categories</h5>
					<ul>
						<li><a href="#searchresults/javascript/category">Javascript</a></li>
						<li><a href="#searchresults/node/category">Node</a></li>
						<li><a href="#searchresults/ruby/category">Ruby</a></li>
						<li><a href="#searchresults/random/category">Random</a></li>
					</ul>
				</div>
			</div>
		);
	},
	searchQuery: function(e) {
		e.preventDefault();
		var choice = null

		if(this.refs.userId.getDOMNode().checked) {
			choice ="userId"
		}
		else {
			choice="title"
		}
		var searchCategory = this.refs.search.getDOMNode().value;
		console.log(searchCategory);
		this.props.myRouter.navigate("searchresults/"+searchCategory+"/"+choice, {trigger:true});
	}
});