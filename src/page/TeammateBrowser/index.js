import React, { Component } from "react";

import "./style.css";
import SimpleList from "../../components/SimpleList/SimpleList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../components/layout";
import List from "../../components/list";
import Card from "../../components/card";
import { useUsersState } from "../../context";
import { Link } from "react-router-dom";

const TeammateBrowser = () => {
	const userContext = useUsersState();
	const numCol = 2;
	const isProject = false;
	const numItem = 3;

	return (
		<div>
			<Layout>
				<div className="project-brw-container">
					<div className="project-brw-search-container">
						<SearchBar />
					</div>
					<List
						grid={{ space: 10, column: 4 }}
						dataSource={userContext.users}
            renderItem={item => 
				<Link to={{pathname:"/user", state: {username: item.userName}}}>
					<Card>{ item.userName}</Card>
				</Link>}
					/>
					{/* <SimpleList
							pathname={"/teammates"}
							numCol={numCol}
							numItem={numItem}
							data={data}
							isProject={isProject}
						/> */}
				</div>
			</Layout>
		</div>
	);
};

export default TeammateBrowser;
