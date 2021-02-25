import React, { Component } from "react";
import Layout from "../../components/layout";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import TeamSvg from '../../assets/team.svg';

import "./style.css";

class Project extends Component {
	render() {
		return (
			<div className="project-page-container">
				<Layout>
					<div className="project-page-content row-v-center">
						<div className="project-page-carouel rounded shadow">
							<img src={TeamSvg} alt="team" className="project-page-image"/>
							<div
								className="project-page-go-back"
								onClick={() => this.props.history.goBack()}
							>
								<ArrowLeftOutlined />
							</div>
						</div>
						<div className="project-page-name">A great project</div>
						<div className="project-page-tags">
							<div className="project-page-tag">tag</div>
							<div className="project-page-tag">tag</div>
						</div>
					</div>
				</Layout>
			</div>
		);
	}
}

export default withRouter(Project);