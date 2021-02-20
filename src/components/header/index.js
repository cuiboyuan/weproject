import React, { Component } from "react";

import "./style.css";
import Layout from "../layout";
import Logo from "../logo";
import Tab from "./tab.js";

export default class Header extends Component {
	render() {
		return (
			<div className="header-container col-h-center shadow">
				<Layout>
					<div className="header-content">
						<Logo />
						<div className="header-tabs row-v-center">
							{this.props.routes.map((r, index) => (
								<Tab
									key={index}
									active={this.props.activeIndex === index}
									onSelect={() => this.props.onSelect(index)}
								>
									{r.name}
								</Tab>
							))}
						</div>
						{/* TODO: sign in / user name */}
						<div>Jerry</div>
					</div>
				</Layout>
			</div>
		);
	}
}
