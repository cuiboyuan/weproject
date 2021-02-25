import React, { Component } from "react";
import Layout from "../../components/layout";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import TeamSvg from '../../assets/team.svg';

import "./style.css";

class Project extends Component {
	render() {
		const data = this.props.location.state.data;
		return (
			<div className="project-page-container">
				<Layout>
					<div className="project-page-content row-v-center">
						<div className="project-page-carouel rounded shadow-cust">
							<img src={TeamSvg} alt="team" className="project-page-image"/>
							<div
								className="project-page-go-back"
								onClick={() => this.props.history.goBack()}
							>
								<ArrowLeftOutlined />
							</div>
						</div>
						<div className="project-page-name">{data.projectName}</div>
						<div className="project-page-tags">
							<div className="project-page-tag">tag</div>
							<div className="project-page-tag">tag</div>
						</div>
						<p>{data.projectDiscription}</p>
					</div>
				</Layout>
			</div>
		);
	}
}

export default withRouter(Project);