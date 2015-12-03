//"use strict";
import alt from './alt.js';
import ProjectAsyncSource from "./asyncSource.js";
import ProjectActions from "./actions.js";
import toastr from "toastr";
import { Router, Route, Link } from 'react-router';
import Immutable from "Immutable"

class ProjectStore {
	constructor(){
		//super();
		this.state = Immutable.Map({
			project:  this.emptyProject(),
			projects: []
		});
		this.bindActions(ProjectActions);
		this.registerAsync(ProjectAsyncSource);

	}
	onGetInitialDataSuccess (projects) {
		this.setState({
  			 projects: projects
  		});
	}
	onGetInitialDataFailure (projects) {
		return projects;
	}
	onProjectSubmitSuccess(response){
		let projects = this.state.projects; 
		projects.push(response.project)
		this.setState({
			 projects: projects,
		});
		response.history.replaceState("#/projects");
  		toastr.success('Successfully Created !!');
		
  		
	}
	onProjectSubmitFailure(project){
	}
	onGetSpecificDataSuccess(project) {
		console.log('in onGetSpecificDataSuccess');
		console.log(project);
		this.setState({
			project: project
		});
	}
	onGetSpecificDataFailure(project) {

	}
	emptyProject (){
		return (
			{
				"projectName": "",
				"clientName": "",
				"teamLead": ""
			}
		);
	}

}

module.exports = alt.createStore(ProjectStore,"ProjectStore");