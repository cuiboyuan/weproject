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
import SimpleList from "../../components/SimpleList/SimpleList";

const members = [...Array(3).keys()].map((_, i) => {
	return { userName: `member ${i}` };
});
const applicants = [...Array(4).keys()].map((_, i) => {
	return { userName: `applicant ${i}` };
});


class Profile extends Component {

	constructor(props) {
		super(props);

		let {auth, allUsers, allProjects, location} = this.props;

		let loginName = this.props.auth.userName;
		let loginUser = this.props.allUsers.users.filter(item => item.userName == loginName)[0];
		
		let currentName, currentUser;
		console.log(this.props);

		let isProfile = false;
		if (this.props.location.pathname === '/profile'){
			currentName = loginName;
			currentUser = loginUser;
			isProfile = true;
		} else {
			currentName = this.props.location.state.username;
			currentUser = this.props.allUsers.users.filter(item => item.userName == currentName)[0];
		}
		
		// Need some modification
		let ownedProjects = allProjects.projects.filter(item => item.owner.userName == currentName);
		let joinedProjects = allProjects.projects.filter(item => currentUser.joinedProjectIds.includes(item.id));

		this.state = {
			currentTab: "detail",
			username: currentName,
			ownedProjects: ownedProjects,
			joinedProjects: joinedProjects,

			isAdmin: auth.isAdmin,
			isProfile: isProfile,
		};
	}
	handleClick = e => {
		this.setState({ currentTab: e.key });
	};
	render() {
		let {currentTab, username, ownedProjects, joinedProjects, isAdmin, isProfile} = this.state;
		return (
			<div>

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
								<Avatar
										className="simplecard-avatar"
										icon={<UserOutlined />}
									/>
								<div className="project-page-name">{username}</div>
								<div className="project-page-margin">
									<Button type="text" icon={<LikeOutlined />} />
									{isProfile && (<Button className="rounded" size="medium" type="primary">
										Edit Profile
									</Button>)}

									{isAdmin && !isProfile && (<Button className="rounded" size="medium" danger>
										Delete
									</Button>)}
								</div>
							</div>
							<div className="project-page-tags">
								{/* {data.tags?.map(tag => (
									<div className="project-page-tag">{tag}</div>
								))} */}
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
								My Projects
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
									<span>User detail</span>
								</div>
								<p> I am {username}. </p>
								{/* <div
									style={{
										width: "100%",
										height: "150px",
										backgroundColor: "#66666650",
									}}
								/> */}
							</div>
						)}
						{this.state.currentTab === "team" && (
							<div className="project-page-info-block shadow-cust rounded">
								<div className="project-page-info-block-title">
									<span>Owned Projects</span>
								</div>

								
								<SimpleList
									isAdmin={this.state.isAdmin}
									pathname={"/project"}
									numCol={3}
									numItem={ownedProjects.length}
									data={ownedProjects}
									isProject={true}
								/>
								
								<div className="project-page-info-block-title">
									<span>Joined Projects</span>
								</div>
								
								<SimpleList
									isAdmin={this.state.isAdmin}
									pathname={"/project"}
									numCol={3}
									numItem={joinedProjects.length}
									data={joinedProjects}
									isProject={true}
								/>

								{/* {[...members].map((member, i) => (
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
								))} */}
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
			</div>
		);
	}
}

export default withRouter(Profile);
