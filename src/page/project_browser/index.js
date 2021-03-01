import React from "react";

import "./style.css";

import SimpleList from "../../components/SimpleList/SimpleList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../components/layout";
import { useProjectState } from "../../context";

const ProjectBrowser = props => {
	const projectContext = useProjectState();
	const numCol = 3;

	return (
		<div>
			<Layout>
				<div className="project-brw-container">
					<div className="project-brw-search-container">
						<SearchBar />
					</div>
					<SimpleList
						isAdmin={props.isAdmin}
						pathname={"/project"}
						numCol={numCol}
						numItem={projectContext.projects.length}
						data={projectContext.projects}
						isProject={true}
					/>
				</div>
			</Layout>
		</div>
	);
};

export default ProjectBrowser;
