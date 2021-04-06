import React, { createContext, useContext, useState } from "react";
import uuid from "react-uuid";

import { Project } from "../../model";

const ProjectContext = createContext();

const data = [...Array(9).keys()].map((_, i) => {
	const id = uuid();
	return new Project(
		id,
		{
			id: uuid(),
			userName: `user${i}`,
			password: `user${i}`,
			ownedProjectIds: [id],
			joinedProjectIds: [],
		},
		`project ${i}`,
		`project ${i} description`,
		`project requirement ${i}`,
		undefined,
		undefined,
		[],
		["tag 1", "tag 2"]
	);
});

export const ProjectProvider = props => {
	const [projects, setProjects] = useState(data);

	const updateProject = project => {
		let index = projects.findIndex(p => p.id === project.id);
		if (index >= 0) {
			let newProjects = projects;
			newProjects.splice(index, 1, project);
			setProjects(newProjects);
		}
	};

	const joinProject = (projectId, userName) => {
		let index = projects.findIndex(p => p.id === projectId);
		if (index >= 0) {
			let exist = (projects[index].applicants || []).findIndex(
				a => a === userName
			);
			if (exist >= 0) return;
			projects[index].applicants = [
				...(projects[index].applicants || []),
				userName,
			];
			setProjects(projects);
		}
	};

	const deleteProject = projectId => {
		let index = projects.findIndex(p => p.id === projectId);
		console.log(index);
		if (index >= 0) {
			projects.splice(index, 1);
			setProjects(projects);
		}
	};

	const proceedStep = projectId => {
		let index = projects.findIndex(p => p.id === projectId);
		if (index >= 0) {
			let newProject = projects[index];
			if (newProject.progress.current < newProject.progress.steps) {
				newProject.progress.current = newProject.progress.current + 1;
			} else {
				newProject.progress.current = newProject.progress.steps.length;
			}
			projects.splice(index, 1, newProject);
			setProjects(projects);
		}
	};

	const withdralStep = projectId => {
		let index = projects.findIndex(p => p.id === projectId);
		if (index >= 0) {
			let newProject = projects[index];
			if (newProject.progress.current > 0) {
				newProject.progress.current = newProject.progress.current - 1;
			} else {
				newProject.progress.current = 0;
			}
			projects.splice(index, 1, newProject);
			setProjects(projects);
		}
	};

	const getValues = () => {
		return {
			projects,
			setProjects,
			updateProject,
			joinProject,
			deleteProject,
			proceedStep,
			withdralStep,
		};
	};

	return (
		<ProjectContext.Provider value={getValues()}>
			{props.children}
		</ProjectContext.Provider>
	);
};

export function useProjectState() {
	const context = useContext(ProjectContext);
	if (!context)
		throw new Error("useProjectState must be used within a ProjectProvider");
	return context;
}
