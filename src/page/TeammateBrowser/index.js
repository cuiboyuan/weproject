import React, { Component, useState } from "react";

import "./style.css";
import SimpleList from "../../components/SimpleList/SimpleList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../components/layout";
import List from "../../components/list";
import Card from "../../components/card";
import { useUsersState } from "../../context";
import { Link } from "react-router-dom";


const TeammateBrowser = (props) => {
	const userContext = useUsersState();

	//the data that is actually displayed on the teambrowing page
	const [displayData, setDisplayData] = useState(userContext.users);

	// the function used to respind to search request, used in searchBar Component
	const filterData = (searchContent)=>{
		if (searchContent == ""){
			setDisplayData(userContext.users);
		}else{
			console.log(userContext.users)
			setDisplayData(userContext.users.filter(user=>{return user.userName.includes(searchContent)}));
		}
	}

	return (
		<div>
			<Layout>
				<div className="project-brw-container">
					<div className="project-brw-search-container">
						<SearchBar 
						filterFunction = {filterData}
						pageName={"people"}	
						/>
					</div>
					<SimpleList
							pathname={'/user'}
							data={displayData}
							isProject={false}
							isAdmin={props.isAdmin}
						/>
				</div>
			</Layout>
		</div>
	);
};

export default TeammateBrowser;
