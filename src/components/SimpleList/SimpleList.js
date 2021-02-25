import React, { Component } from "react";
import { Container } from "react-bootstrap";

import "./style.css";
import SimpleRow from "./SimpleRow";
import { uid } from "react-uid";
export default class SimpleList extends Component {
	render() {
		//isProject is an indicator, whether it is used for people / project view
		//uncomment the code after the project browsing view implementation
		const { numCol, numItem, data, isProject } = this.props;
		if (data.length % numCol != 0) {
			let i = 0;
			while (i < numItem % numCol) {
				data.push({});
				i += 1;
			}
		}

		let acc = [];
		for (let i = 0; i < data.length; i = i + numCol) {
			acc.push(data.slice(i, i + numCol));
		}
		return (
			// <div className="scard-container">
				<Container fluid>
					{acc.map(item => (
						<SimpleRow
							isAdmin={this.props.isAdmin}
							key={uid(item)}
							isProject={isProject}
							data={item}
							pathname={this.props.pathname}
						/>
					))}
				</Container>
			// </div>
		);
	}
}
