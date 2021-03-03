import React, { Component } from "react";
import { Container, Row} from "react-bootstrap";

import "./style.css";
import SimpleRow from "./SimpleRow";
import { uid } from "react-uid";
import SimpleCard from "../SimpleCard/SimpleCard";
import PeopleCard from "../SimpleCard/PeopleCard"
export default class SimpleList extends Component {
	render() {
		console.log("SimpleList pass in args", this.props)
		return (
				<Container fluid>
					<Row>
					{this.props.data.map(item => (
						<SimpleCard
							isAdmin={this.props.isAdmin}
							key={uid(item)}
							isProject={this.props.isProject}
							data={item}
							pathname={this.props.pathname}
						/>
					))}
					</Row>
				</Container>
		);
	}
}
