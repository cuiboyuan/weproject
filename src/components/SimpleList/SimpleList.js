import React, { Component } from "react";
import { Container, Row} from "react-bootstrap";

import "./style.css";
import SimpleRow from "./SimpleRow";
import { uid } from "react-uid";
import SimpleCard from "../SimpleCard/SimpleCard";
import PeopleCard from "../SimpleCard/PeopleCard"
import ProjectCard from "../SimpleCard/ProjectCard";


const SimpleList = ({isAdmin, pathname, data, isProject, sortFunction, removeFunction})=>{
		if (isProject){
		return (
				<Container fluid>
					<Row>
					{data.map(item => (
						<ProjectCard
							isAdmin={isAdmin}
							key={uid(item)}
							data={item}
							pathname={pathname}
							sortFunction={sortFunction}
							removeFunction={removeFunction}
						/>
					))}
					</Row>
				</Container>
		);}else{
			return(
				<Container fluid>
					<Row>
					{data.map(item => (
						<PeopleCard
							isAdmin={isAdmin}
							key={uid(item)}
							data={item}
							pathname={pathname}
							sortFunction={sortFunction}
							removeFunction={removeFunction}
						/>
					))}
					</Row>
				</Container>
			)
		}
}

export default SimpleList