import React, { Component } from "react";
import Layout from "../../components/layout";
import {
	ArrowLeftOutlined,
	UserOutlined,
	RiseOutlined,
	ReadOutlined,
	TeamOutlined,
	ControlOutlined,
	LikeOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import TeamSvg from "../../assets/team.svg";
import { Avatar, Button, Menu } from "antd";

import "./style.css";

const members = [...Array(3).keys()].map((_, i) => {
	return { userName: `member ${i}` };
});
const applicants = [...Array(4).keys()].map((_, i) => {
	return { userName: `applicant ${i}` };
});

class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTab: "detail",
		};
	}
	handleClick = e => {
		this.setState({ currentTab: e.key });
	};
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
						<div className="project-page-info">
							<div className="project-admin-control">
								<div className="project-page-name">{data.name}</div>
								<div className="project-page-margin">
									<Button type="text" icon={<LikeOutlined />} />
									<Button className="rounded" size="medium" type="primary">
										Join the project
									</Button>

									<Button className="rounded" size="medium" danger>
										Delete
									</Button>
								</div>
							</div>
							<div className="project-page-tags">
								{data.tags?.map(tag => (
									<div className="project-page-tag">{tag}</div>
								))}
							</div>
						</div>

						<Menu
							onClick={this.handleClick}
							selectedKeys={[this.state.currentTab]}
							mode="horizontal"
						>
							<Menu.Item key="detail" icon={<ReadOutlined />}>
								Detail
							</Menu.Item>
							<Menu.Item key="team" icon={<TeamOutlined />}>
								Team
							</Menu.Item>
							<Menu.Item key="progress" icon={<RiseOutlined />}>
								Progress
							</Menu.Item>
							<Menu.Item key="manage" icon={<ControlOutlined />}>
								Manage
							</Menu.Item>
						</Menu>
						{this.state.currentTab === "detail" && (
							<div className="project-page-info-block shadow-cust rounded">
								<div className="project-page-info-block-title">
									<span>Project detail</span>
								</div>
								<p>{data.description}</p>
								<div
									style={{
										width: "100%",
										height: "150px",
										backgroundColor: "#66666650",
									}}
								/>
							</div>
						)}
						{this.state.currentTab === "team" && (
							<div className="project-page-info-block shadow-cust rounded">
								<div className="project-page-info-block-title">
									<span>Team members</span>
								</div>

								{[data.owner, ...members].map((member, i) => (
									<div className="project-page-owner">
										<Avatar
											className="simplecard-avatar"
											size={40}
											icon={<UserOutlined />}
										/>
										<div className="project-page-owner-name-span">
											<span>{member.userName}</span>
										</div>
										{i === 0 && (
											<span className="project-owner-badge">owner</span>
										)}
									</div>
								))}
							</div>
						)}
						{this.state.currentTab === "progress" && (
							<div className="project-page-info-block shadow-cust rounded">
								<div className="project-page-info-block-title">
									<span>Current Progress</span>
								</div>
							</div>
						)}
						{this.state.currentTab === "manage" && (
							<div className="project-page-info-block shadow-cust rounded">
								<div className="project-page-info-block-title">
									<span>Project Applicants</span>
								</div>

								{applicants.map(member => (
									<div className="project-page-owner">
										<Avatar
											className="simplecard-avatar"
											size={40}
											icon={<UserOutlined />}
										/>
										<div className="project-page-owner-name-span">
											{" "}
											<span>{member.userName}</span>
										</div>
										<Button className="rounded" size="medium">
											Accept
										</Button>
										<Button className="rounded" size="medium" danger>
											Reject
										</Button>
									</div>
								))}
							</div>
						)}
					</div>
				</Layout>
			</div>
		);
	}
}

export default withRouter(Project);
