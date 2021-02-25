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
			<div className="top5">
				<Row>
					{data.map((item, index) => (
						<SimpleCard
							isAdmin={ this.props.isAdmin}
							data={{ ...item, pathname: this.props.pathname }}
							isProject={isProject}
							key={uid(item)}
							isLast={index === (data.length - 1)}
						/>
					))}
				</Row>
			</div>
		);
	}
}
