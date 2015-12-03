import alt from './alt.js';
class ProjectActions {
	constructor (){
		this.generateActions('projectSubmitSuccess','projectSubmitFailure','getInitialDataSuccess','getInitialDataFailure','getSpecificDataSuccess','getSpecificDataFailure');
	}
 	
}
export default  alt.createActions(ProjectActions);
