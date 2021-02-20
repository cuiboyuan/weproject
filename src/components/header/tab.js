import React, { Component } from "react";

import "./style.css";

export default class Tab extends Component {
	render() {
		return (
			<div
				className={`tab-container ${this.props.active ? "tab-active" : ""}`}
				onClick={this.props.onSelect}
			>
				{this.props.children}
			</div>
		);
	}
}
