var $ = require("jQuery");
import ProjectActions from "./actions.js";

const ProjectAsyncSource = {
	projectSubmit: {
		remote (state,project,history){
			return new Promise((resolve, reject) => {
				$.ajax({
					url: "http://localhost:3000/projects",
					type: "POST",
					data: project,
					success: function(response){
						let data = {
							project: response,
							history: history
						}
						resolve(data);
					},
					error: function(response) {
						reject(response,history);
					}
				});
				
			});
		},
		success: ProjectActions.projectSubmitSuccess,
		error: ProjectActions.projectSubmitFailure
		
	},
	getSpecificData: {
		remote (state,projectId){
			return new Promise((resolve, reject) => {
				$.ajax({
					url: "http://localhost:3000/projects/"+projectId,
					type: "GET",
					success: function(response){
						resolve(response);
					},
					error: function(response) {
						reject(response);
					}
				});
				
			});
		},
		success: ProjectActions.getSpecificDataSuccess,
		error: ProjectActions.getSpecificDataFailure
	},
	getInitialData: {
		remote(state) {
			return new Promise((resolve,reject) =>{
				$.ajax({
					url: "http://localhost:3000/projects?_sort=id&_order=DESC",
					type: "GET",
					success: function(response){
						resolve(response);
					},
					error: function(response) {
						reject(response);
					}
				});
			});
		},
		success: ProjectActions.getInitialDataSuccess,
		error: ProjectActions.getInitialDataFailure
	}

}
export default ProjectAsyncSource;