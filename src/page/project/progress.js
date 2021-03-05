import React, { Component } from "react";

import "./style.css";

const ProgressItem = props => {
	const item = props.item;
	return (
		<div className="project-page-progress shadow-cust rounded">
			<div className="project-page-progress-step">
				<div
					className={`project-step ${
						props.complete ? "project-step-complete" : ""
					}`}
				>
					{props.step}
				</div>
				<div
					className={`project-step-status ${
						props.complete ? "project-step-status-complete" : ""
					}`}
				>
					{props.complete ? "COMPLETE" : "INCOMPLETE"}
				</div>
			</div>
			<div className="project-progress-subitem-container">
                <div className="project-progress-subitem-title">{item.title}</div>
				{item.subitems.map((item, index) => <div key={index} className="project-progress-subitem">{item}</div>)}
			</div>
		</div>
	);
};

export default class Progress extends Component {
	render() {
		return (
			<div className="project-page-progress-content">
				{this.props.items.map((item, index) => (
					<ProgressItem
						key={index}
						complete={index < this.props.current}
						step={index + 1}
						item={item}
					/>
				))}
			</div>
		);
	}
}
