import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style.css";

export default class Tab extends Component {
	render() {
		return (
			<Link
				to={this.props.to}
				className={`link tab ${this.props.active ? "tab-active" : ""}`}
			>
				{this.props.children}
			</Link>
		);
	}
}
