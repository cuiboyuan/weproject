import React, { Component } from "react";

import "./style.css";
// import SimpleCard from "../../components/SimpleCard/SimpleCard.js";
// import CardGroup from 'react-bootstrap/CardGroup';
// import { CardDeck, Col, Container, Row } from "react-bootstrap";
// import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import reactDom from "react-dom";
import SimpleList from "../../components/SimpleList/SimpleList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../components/layout";
export default class ProjectBrowser extends Component {
	state = {
		inputForm: "",
		projects: [],
	};

	render() {
		const data = [...Array(9).keys()].map((_, i) => {
			return {
				pid: i,
				owner: { username: `user ${i}` },
				projectName: `project ${i}`,
				projectDiscription: `project ${i} description`,
			};
		});

		// [
		// 	{
		// 		pid: 1,
		// 		projectName: "project 1",
		// 		projectDiscription: "project 1 discription",
		// 	},
		// 	{
		// 		pid: 2,
		// 		projectName: "project 2",
		// 		projectDiscription: "project 2 discription",
		// 	},
		// 	{
		// 		pid: 3,
		// 		projectName: "project 3",
		// 		projectDiscription: "project 3 discription",
		// 	},
		// ];
		const numCol = 3;
		const isProject = true;
		console.log("browser index.js", data);

		return (
			// <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
			// 	<a href="/project">to go project</a>
			// </div>

			<div>
				<Layout>
					<div className="project-brw-container">
						<div className="project-brw-search-container">
							<SearchBar />
						</div>
						<SimpleList
							isAdmin={this.props.isAdmin}
							pathname={"/project"}
							numCol={numCol}
							numItem={data.length}
							data={data}
							isProject={isProject}
						/>
					</div>
				</Layout>
			</div>
		);
	}
}
