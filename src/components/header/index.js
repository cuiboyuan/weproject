import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./style.css";
import Layout from "../layout";
import Logo from "../logo";
import Tab from "./tab";
import Auth from "./auth";

class Header extends Component {
	render() {
		if (
			this.props.routes.findIndex(r => r.url === this.props.location.pathname) >
			-1
		) {
			return (
				<div className="header-container col-h-center shadow-cust">
					<Layout>
						<div className="header-content">
							<Logo />
							<div className="header-tabs row-v-center">
								{this.props.routes.map((r, index) => (
									<Tab
										key={index}
										to={r.url}
										active={this.props.location.pathname === r.url}
									>
										{r.name}
									</Tab>
								))}
							</div>
							<Auth authInfo={this.props.authInfo} logout={this.props.logout}/>
						</div>
					</Layout>
				</div>
			);
		}
		return <></>;
	}
}

export default withRouter(Header);
