import React from "react";
import { Router, Route, Link } from 'react-router';
export default class SingleProjItem extends React.Component {
	constructor(props){
		super(props);
	}
	/*PropTypes: {
		project: React.PropTypes.object.isRequired
	},*/
	render (){
		return (
			<li ref="singleProj" data-projid={this.props.project.id} key={this.props.project.id} className="list-group-item"><Link to={`/projects/${this.props.project.id}`}>{this.props.project.projectName}</Link></li>
		);
	}
};

