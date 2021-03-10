import React, { useState } from "react";

import "./style.css";
import SimpleList from "../../components/SimpleList/SimpleList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../components/layout";
import { useUsersState } from "../../context";


const TeammateBrowser = (props) => {
	const userContext = useUsersState();

	const compare = (p1, p2)=>{
		if (p1.topped == p2.topped){
			//if tie, sort by project id
			return p1.id > p2.id?-1:1;
		}else{
			//if p1 is topped but p2 isn't
			if (p1.topped){
				return -1;
			}else{
				return 1;
			}
		}
	}


	//the data that is actually displayed on the teambrowing page
	const [displayData, setDisplayData] = useState([...userContext.users].sort(compare));

	// the function used to respind to search request, used in searchBar Component
	const filterData = (searchContent)=>{
		if (searchContent == ""){
			setDisplayData([...userContext.users].sort(compare));
		}else{
			setDisplayData(userContext.users.filter(user=>{return user.userName.includes(searchContent)}));
		}
	}



	const sortData = ()=>{

		setDisplayData([...displayData].sort(compare));

	}

	const removeData = (user)=>{
		setDisplayData(displayData.filter((item)=>{
			return item.id != user.id;
		}));
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
							sortFunction = {sortData}
							removeFunction={removeData}
						/>
				</div>
			</Layout>
		</div>
	);
};

export default TeammateBrowser;
