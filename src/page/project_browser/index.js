import React, {useState}from "react";

import "./style.css";

import SimpleList from "../../components/SimpleList/SimpleList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../components/layout";
import { useProjectState } from "../../context";


const ProjectBrowser = props => {
	const projectContext = useProjectState();

	//the data that is actually displayed on the browsing page
	const [displayData, setDisplayData] = useState(projectContext.projects);
	

	//the function used to respond to search request, used in SearchBar Component
	const filterData = (searchContent)=>{
		if (searchContent == ""){
			setDisplayData(projectContext.projects);
			console.log("nnnnnn",displayData);
		}else{
			setDisplayData(projectContext.projects.filter(project=>{return project.name.includes(searchContent)}));

		}
	}


	return (
		<div>
			<Layout>
				<div className="project-brw-container">
					<div className="project-brw-search-container">
						<SearchBar 
						filterFunction={filterData}
						pageName={"project"} />
					</div>
					<SimpleList
						isAdmin={props.isAdmin}
						pathname={"/project"}
						data={displayData}
						isProject={true}
					/>
				</div>
			</Layout>
		</div>
	);
};

export default ProjectBrowser;
