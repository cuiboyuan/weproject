import React, { Component } from "react";
import { Row } from "react-bootstrap";
import SimpleCard from "../SimpleCard/SimpleCard";
import { uid } from "react-uid";
export default class SimpleRow extends Component {
	render() {
		const { data, isProject } = this.props;
		// simple example here
		// const data = [{projectName: "csc309", projectDiscription: "interesting Project"}, {}, {}, {}]
		// const isProject = true;
		return (
			<div>
				<Row className="top5">
					{data.map(item => (
						<SimpleCard data={{...item, pathname: this.props.pathname}} isProject={isProject} key={uid(item)} />
					))}
				</Row>
			</div>
		);
	}
}
