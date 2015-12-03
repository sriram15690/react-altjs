import React from 'react';
import SingleProjItem from "./singleProjComponent.js";
export default class ProjectListComp extends React.Component {
	constructor() {
    	super();
	}
	render (){
		var projectsList = [];
		for(var i in this.props.projects ){
			projectsList.push(<SingleProjItem project={this.props.projects[i]}/>);
		}
		return (
			<div>
				<ul className="list-group">
					{projectsList}
				</ul>
			</div>
		);
	}
}
