var $ = require("jQuery");
import React from 'react';
import ReactDOM from 'react-dom';
import ProjectStore from "./store.js";
import  ProjectListComp from "./ProjListComponent.js";
import TextBox from "./textboxComponent.js"
import ProjectActions from "./actions";
import { Router, Route, Link } from 'react-router';
import History from "history";
require("../css/style.css");

class TitleComp extends React.Component {
	render (){
		return React.createElement('h4', {}, this.props.title);
	}
};

class IndexPage extends React.Component {
  constructor() {
  super();
  this.state = {
  	   projects: []
  	};
    this.onChange = this.onChange.bind(this);
  }
 componentDidMount (){
 	  	ProjectStore.listen(this.onChange);
  		ProjectStore.getInitialData();
  }
  componentWillUnmount() {
      ProjectStore.unlisten(this.onChange);
  }
  onChange (state) {
      this.setState(ProjectStore.getState());
  }
  
  render() {
    return (
    	<div>
    		 <div className="well col-md-5 pull-left" style={{"height": "500px", "overflowY": "auto"}}>
          <TitleComp title="Project List"/>
					<ProjectListComp projects={this.state.projects} />
			   </div>
          <div className="well col-md-5 pull-right">
            {this.props.children}
          </div>
    	</div>
    	); 
  }
}

class NewProjComp extends React.Component {
  constructor() {
  super();
  this.state = {
    project: {
      "projectName": "",
      "clientName": "",
      "teamLead": ""
    }
  }
  this.onInputChange = this.onInputChange.bind(this);
  this.onChange = this.onChange.bind(this);
  this.handleProjSubmit = this.handleProjSubmit.bind(this);
 }
 componentDidMount (){
    ProjectStore.listen(this.onChange);
  }
  componentWillUnmount() {
      ProjectStore.unlisten(this.onChange);
  }
  onChange (state) {
      this.setState(ProjectStore.getState());
  }
  onInputChange (event){
    var field = event.target.name;
    var value = event.target.value;
    this.state.project[field] = value;
    return this.setState({
      project: this.state.project
    });
  }
  handleProjSubmit (event){
     event.preventDefault();
     ProjectStore.projectSubmit(this.state.project,this.props.history);
     //this.props.history.replaceState("/");
  }
  
  render (){
    return (
        <div>
        <div className="well">
          <TitleComp title="Create Project"/>
          <form onSubmit={this.handleProjSubmit}>
            <TextBox value={this.state.project.projectName} labelName="Project Name" name="projectName" onChange={this.onInputChange}/>
            <TextBox value={this.state.project.clientName} labelName="Client Name" name="clientName" onChange={this.onInputChange}/>
            <TextBox value={this.state.project.teamLead} labelName="Team Lead" name="teamLead" onChange={this.onInputChange}/>
            <input type="Submit" value="Submit" className="btn btn-primary"/>
          </form>
        </div>
        </div>
    );
  }
}

class ShowPageComp extends React.Component {
  constructor() {
  super();
   this.state = {
       project: {
          projectName: "",
          clientName: "",
          teamLead: ""
       }
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount (){
      ProjectStore.listen(this.onChange);
      ProjectStore.getSpecificData(this.props.routeParams.id);
  }
  componentWillUnmount() {
      ProjectStore.unlisten(this.onChange);
  }
  componentWillReceiveProps(nextProps) {
    ProjectStore.getSpecificData(nextProps.params.id);
  }
  onChange (state) {
      this.setState({
        project: ProjectStore.getState().project
      });
  }
  render(){
    return(
    <div>
    <TitleComp title="Project Details"/>
    <table className="table table-bordered">
      <tbody>
       <tr>
          <td>
            Project ID
          </td>
          <td>
            {this.state.project.id}
          </td>
        </tr>
        <tr>
          <td>
            Project Name
          </td>
          <td>
            {this.state.project.projectName}
          </td>
        </tr>
        <tr>
          <td>
            Client Name
          </td>
          <td>
            {this.state.project.clientName}
          </td>
        </tr>
        <tr>
          <td>
            Team Lead
          </td>
          <td>
            {this.state.project.teamLead}
          </td>
        </tr>
      </tbody>
    </table>
    </div>
     );

  }
}

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
      <ul className="breadcrumb">
        <li><a href="#/projects">All Projects</a> </li>
        <li><a href="#/newProject">New Project</a></li>
      </ul>
          { this.props.children }
      </div>
    )
  }
}

class PageComp extends React.Component {
    render() {
      return (
      <Router>
        <Route path="/" component={App}>
          <Route  path="projects" component={IndexPage}>
            <Route path="/projects/:id" component={ShowPageComp} />
          </Route>
          <Route  path="newProject" component={NewProjComp}/>
        </Route>
      </Router>
      );
    }

}
ReactDOM.render(<PageComp />,document.getElementById("wrapper"));