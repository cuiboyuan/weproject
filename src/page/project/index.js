import React, { Component } from "react";
import Layout from "../../components/layout";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import TeamSvg from "../../assets/team.svg";
import { Avatar, Button } from "antd";

import "./style.css";

const members = [...Array(3).keys()].map((_, i) => { return { username: `member ${i}` } });
const applicants = [...Array(3).keys()].map((_, i) => { return { username: `applicant ${i}` } });

class Project extends Component {
	render() {
		const data = this.props.location.state.data;
		console.log(data);
		return (
			<div className="project-page-container">
				<Layout>
					<div className="project-page-content row-v-center">
						<div className="project-page-carouel rounded shadow-cust">
							<img src={TeamSvg} alt="team" className="project-page-image" />
							<div
								className="project-page-go-back"
								onClick={() => this.props.history.goBack()}
							>
								<ArrowLeftOutlined />
							</div>
						</div>
						<div className="project-page-info-block shadow-cust rounded">
							<div className="project-page-name">{data.projectName}</div>
							<div className="project-page-tags">
								<div className="project-page-tag">tag</div>
								<div className="project-page-tag">tag</div>
							</div>
							<p>{data.projectDiscription}</p>
						</div>
						<div className="project-page-info-block shadow-cust rounded">
							<div className="project-page-info-block-title">
								<span>Team members</span>
								<Button className="rounded" size="large">Join the project</Button>
							</div>

							{[data.owner, ...members].map(member => (<div className="project-page-owner">
								<Avatar
									className="simplecard-avatar"
									size={50}
									icon={<UserOutlined />}
								/>
								<span>{member.username}</span>
							</div>))}
						</div>
						<div className="project-page-info-block shadow-cust rounded">
							<div className="project-page-info-block-title">
								<span>Project Applicants</span>
							</div>

							{applicants.map(member => (<div className="project-page-owner">
								<Avatar
									className="simplecard-avatar"
									size={50}
									icon={<UserOutlined />}
								/>
								<span>{member.username}</span>
							</div>))}
						</div>
					</div>
				</Layout>
			</div>
		);
	}
}

export default withRouter(Project);
