import React, { Component } from "react";
import { Container } from "react-bootstrap";
// import reactDom from 'react-dom'
import SimpleRow from "./SimpleRow";
import { uid } from "react-uid";
export default class SimpleList extends Component {
	render() {
		//isProject is an indicator, whether it is used for people / project view
		//uncomment the code after the project browsing view implementation
		// const {numCol, numItem, data, isProject} = this.props;
		// if (numItem % numCol != 0){
		//     let i = 0;
		//     while(i < numItem % numCol){
		//         data.push({});
		//     }
		// }

		//==========
		//here is an example:
		const data = [
			{
				pid: 1,
				projectName: "csc309",
				projectDiscription: "interesting Project",
			},
			{
				pid: 2,
				projectName: "csc413",
				projectDiscription: "... I don't want to take this course",
			},
			// {},
			// {},
		];
		const numCol = 2;
		const isProject = true;
		const numItem = 4;
		//=========

		let acc = [];
		for (let i = 0; i < data.length; i = i + numCol) {
			acc.push(data.slice(i, i + numCol));
		}
		return (
			<div className="scard-container">
				<Container>
					{acc.map(item => (
						<SimpleRow
							key={uid(item)}
							isProject={isProject}
							data={item}
							pathname={this.props.pathname}
						/>
					))}
				</Container>
			</div>
		);
	}
}
