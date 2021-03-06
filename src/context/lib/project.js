import React, { createContext, useContext, useState, useEffect } from "react";
import uuid from "react-uuid";

import { Project } from "../../model";

const ProjectContext = createContext();

const data = [...Array(9).keys()].map(
	(_, i) => {
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
			["tag 1", "tag 2"],
		);
	}
);

export const ProjectProvider = props => {
	const [projects, setProjects] = useState(data);

	const getValues = () => {
		return {
			projects,
			setProjects,
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
