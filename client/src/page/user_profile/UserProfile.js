import React, { Component } from "react";
import Layout from "../../components/layout";
import {
	ArrowLeftOutlined,
	RiseOutlined,
	ReadOutlined,
	TeamOutlined,
	LikeOutlined,
	DeleteFilled,
	PlusCircleFilled,
	ControlOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";

import TeamSvg from "../../assets/team.svg";

import { Avatar, Button, Menu, Input, notification } from "antd";

import "./style.css";
import SimpleList from "../../components/SimpleList/SimpleList";
import {
	AiOutlineGithub,
	AiOutlineLinkedin,
	AiOutlineMail,
	AiOutlineUser,
} from "react-icons/ai";
import TextArea from "antd/lib/input/TextArea";


/**
 * To link to this page: <Link to={{pathname: '/user', state:{ data: {username: `username`} }}></Link>
 */

class Profile extends Component {
	
	state = {
		currentTab: "detail",
		userName: null,
		loginName: null,
		
		avatar: null,
		description: null,
		email: null,
		linkedin: null,
		github: null,
		skills: null,

		experiences: null,

		newSkill: "",
		newCompany: "",
		newPosition: "",
		newStart: "",
		newEnd: "",

		isEditing: false,

		ownedProjects: null,
		joinedProjects: null,

		adminLogin: null,
		isProfile: null,
		
		
		friendRequests: null,
		friends: null,

		isFriend: null,
		requested: null,
	}

	/* Function calls that involve server */

	componentDidMount() {
		
		const {allUsers, auth, allProjects, location} = this.props;
		let loginName = auth.userName;
		let loginUser = allUsers.getUser(loginName);
		
		/** Basic user info */
		this.setState({loginName: loginName});
		this.setState({adminLogin: loginUser.isAdmin});

		let currentName, currentUser;
		if (location.pathname === "/profile"){
			currentName = loginName;
			currentUser = loginUser;
			this.setState({isProfile: true});
		} else {
			currentName = location.state.data.userName;
			currentUser = allUsers.getUser(currentName);
			this.setState({isProfile: false});
		}
		this.setState(currentUser);

		/** Project info */
		let ownedProjects = allProjects.projects.filter(
			item => item.owner.userName == currentName
		);
		let joinedProjects = allProjects.projects.filter(
			item => item.userIds.includes(currentUser.id)
		);

		this.setState({
			ownedProjects: ownedProjects,
			joinedProjects: joinedProjects,
		})

		/** Friends info */
		
		const isFriend = loginUser.connections.includes(currentName);
		const requested = currentUser.pending.includes(loginName);

		this.setState({
			isFriend: isFriend,
			requested: requested,
		})

        let friends = [];
        let pendings = [];

		for (let name of currentUser.connections) {
			const friend = allUsers.getUser(name);
			friends.push(friend);
        }
        
        for (let name of currentUser.pending) {
			const friend = allUsers.getUser(name);
			pendings.push(friend);
        }

		this.setState({
			friendRequests: pendings,
			friends: friends,
		})


			
	};

	checkTimeout = (res) => {
		if (res === 401){
			notification["error"]({
				message: `Session Timeout`,
			});
			// TODO logout manually
			this.props.history.push("/");
		}
	}

	editProfile = async (e) => {
		
		const {allUsers} = this.props;
		if (this.state.isEditing){
			try {
				const res = await allUsers.updateUserProfile(this.state);
				if (res === 200){
					notification["success"]({
						message: "Profile Updated!",
					});
				} else {
					if (res === 401){
						this.checkTimeout(res);
						return;
					}
					notification["error"]({
						message: `Fail to update. Something went wrong (Error code:${res})`,
					});
					return;
				}
				this.setState({ isEditing: false });
			} catch (error) {
				
				notification["error"]({
					message: `Fail to update. Something went wrong`,
				});
				return;
			}
		} else {
			this.setState({ isEditing: true });
		}
	};

	deleteUser = async (e) => {

		const {allUsers} = this.props;
		try {
			const res = await allUsers.deleteUserProfile(this.state.userName);
			if (res === 200){
				notification["success"]({
					message: `${this.state.userName} Deleted`,
				});
				this.props.history.push("/");
			} else {
				if (res === 401){
					this.checkTimeout(res);
					return;
				}
				notification["error"]({
					message: `Fail to delete ${this.state.userName} (Error code:${res}).`,
				});
			}
			
		} catch (error) {
			
			notification["error"]({
				message: `Fail to delete ${this.state.userName} Something went wrong.`,
			});
		}
		
	};

	connectUser = async e => {
		const {allUsers} = this.props;

		if (!this.state.isFriend){
			try {
				const res = await allUsers.addFriend(this.state.userName);
				if (res === 401) {
					this.checkTimeout(res);
					return;

				} else if (res !== 200){
					notification["error"]({
						message: `Fail to update. Something went wrong (Error code:${res})`,
					});
				} else {
					notification["success"]({
						message: `Request send!`,
					});
					this.setState({requested: true})
				}
			} catch (error) {
				console.log(error)
				notification["error"]({
					message: `Something went wrong`,
				});
			}
		}
	}

	replyFriendRequest = async (member, accept) => {

		const {allUsers} = this.props;

		try {
			const res = await allUsers.replyRequests(member.userName, accept);

			if (res === 401) {
				this.checkTimeout(res);
				return;

			} else if (res !== 200){
				notification["error"]({
					message: `Fail to update. Something went wrong (Error code:${res})`,
				});
			} else {
				const newPendings = this.state.friendRequests.filter(
					item => item.userName !== member.userName
				);

				let newConn = this.state.friends;
				if (accept){
					newConn.push(member);
				}
				this.setState({
					friendRequests: newPendings,
					friends: newConn,	
				})

				notification["success"]({
					message: accept ? `${member.userName} accepted!`: `${member.userName} rejected`,
				});

			}
		} catch (error) {
			console.log(error)
			notification["error"]({
				message: `Something went wrong`,
			});
			
		}

	}

	deleteFriend = async (member) => {
		
		const {allUsers} = this.props;

		try {
			const res = await allUsers.deleteFriend(member.userName)

			if (res === 401) {
				this.checkTimeout(res);
				return;

			} else if (res !== 200){
				notification["error"]({
					message: `Fail to update. Something went wrong (Error code:${res})`,
				});
			} else {
				const newConn = this.state.friends.filter(
					item => item.userName !== member.userName
				);
				
				this.setState({
					friends: newConn,
				})

				notification["success"]({
					message: `${member.userName} removed`,
				});

			}
			
		} catch (error) {
			console.log(error)
			notification["error"]({
				message: `Something went wrong`,
			});
			
		}

	}


	/* Front-end and state management function calls */

	handleClick = e => {
		this.setState({ currentTab: e.key });
	};

	onEditChange = e => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		this.setState({ [name]: value });
	};

	addExperience = e => {
		let experiences = this.state.experiences;
		let exp = {
			company: this.state.newCompany,
			position: this.state.newPosition,
			start: this.state.newStart,
			end: this.state.newEnd,
		};
		if (!experiences.includes(exp)) {
			experiences.push(exp);
			this.setState({ experiences: experiences });
		}
	};

	deleteExperience = exp => {
		let experiences = this.state.experiences.filter(item => exp !== item);
		this.setState({ experiences: experiences });
	};

	addSkill = e => {
		let skill = this.state.newSkill;
		let skills = this.state.skills;
		if (!skills.includes(skill)) {
			skills.push(skill);
			this.setState({ skills: skills });
			this.setState({ newSkill: "" });
		}
	};

	removeSkill = skill => {
		let skills = this.state.skills.filter(item => item !== skill);
		this.setState({ skills: skills });
	};


	onUploadAvatar = e => {

		console.log(e);
		if (e.target.files.length === 0) return;
		let userName = this.state.userName;
		let index = this.props.allUsers.users.findIndex(u => u.userName === userName);
		// let user = this.props.allUsers.users[index];
		let img = {name: e.target.files[0].name, url: URL.createObjectURL(e.target.files[0])};
		// user = { ...user, avatar: img };
		this.props.allUsers.uploadAvatar(this.props.allUsers.users[index], e.target.files[0]).then(res => {
			if (res.status === 200) {
				this.setState({ avatar: img });
			}
		})

		// this.props.allUsers.updateUser(user);
		
	}

	/* render function */

	render() {
		let {
			currentTab,
			userName,
			ownedProjects,
			joinedProjects,
			description,
			experiences,
			github,
			linkedin,
			email,
			skills,
		} = this.state;
		let { adminLogin, isProfile, isEditing, loginName } = this.state;
		let { newSkill, newCompany, newPosition, newStart, newEnd } = this.state;

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
						<div className="user-page-info">
							<div className="project-admin-control">
								<div className="user-profile-avatar">
									<label className="user-profile-avatar-input-label">
										{isProfile && (<input type="file" onChange={this.onUploadAvatar}/>)}
										{this.state.avatar?.url ? <Avatar className="user-profile-avatar-input-label" size={70} src={this.state.avatar.url} /> : <Avatar className="user-profile-avatar-input-label" size={70} icon={<AiOutlineUser />} />}
									</label>
									<div className="project-page-name">{userName}</div>
								</div>
								<div className="project-page-margin">
									<Button type="text" icon={<LikeOutlined />} />

									{isProfile && (
										<Button
											onClick={this.editProfile}
											className="rounded"
											size="medium"
											type="primary"
										>
											{isEditing ? "Save Changes" : "Edit Profile"}
										</Button>
									)}

									{adminLogin && loginName !== userName && (
										<Button
											className="rounded"
											size="medium"
											danger
											onClick={this.deleteUser}
										>
											Delete
										</Button>
									)}

									{!this.state.isFriend && loginName !== userName && (
										!this.state.requested ? (<Button
											className="rounded"
											size="medium"
											type="primary"
											onClick={this.connectUser}
										>
											Connect
										</Button>) : (<div type="primary" className='project-owner-badge'>
											Requested
										</div>)
									)}
								</div>
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
							<Menu.Item key="projects" icon={<TeamOutlined />}>
								My Projects
							</Menu.Item>
							<Menu.Item key="experiences" icon={<RiseOutlined />}>
								Experiences & Education
							</Menu.Item>
							<Menu.Item key="manage" icon={<ControlOutlined />}>
								Manage
							</Menu.Item>
						</Menu>
						{currentTab === "detail" && (
							<div className="project-page-info-block shadow-cust rounded">
								<div className="project-page-info-block-title">
									<span>User detail</span>
								</div>

								{isEditing ? (
									<TextArea
										id="bio"
										value={description}
										name="description"
										onChange={this.onEditChange}
									/>
								) : (
									<div id="bio"> {description} </div>
								)}

								<ul id="socialMediaList">
									<li>
										{isEditing ? (
											<Input
												className="socialMedia"
												prefix={<AiOutlineMail />}
												value={email}
												name="email"
												onChange={this.onEditChange}
											/>
										) : (
											<div>
												{" "}
												<Avatar
													shape="square"
													size="small"
													icon={<AiOutlineMail />}
												/>{" "}
												<span className="socialMedia"> {email} </span>
											</div>
										)}
									</li>

									<li>
										{isEditing ? (
											<Input
												className="socialMedia"
												prefix={<AiOutlineGithub />}
												value={github}
												name="github"
												onChange={this.onEditChange}
											/>
										) : (
											<div>
												<Avatar
													shape="square"
													size="small"
													icon={<AiOutlineGithub />}
												/>
												<span className="socialMedia"> {github} </span>
											</div>
										)}
									</li>

									<li>
										{isEditing ? (
											<Input
												className="socialMedia"
												prefix={<AiOutlineLinkedin />}
												value={linkedin}
												name="linkedin"
												onChange={this.onEditChange}
											/>
										) : (
											<div>
												<Avatar
													shape="square"
													size="small"
													icon={<AiOutlineLinkedin />}
												/>
												<span className="socialMedia"> {linkedin} </span>
											</div>
										)}
									</li>
								</ul>

								<div className="project-page-info-block-title">
									<span>Skills</span>
								</div>

								<div className="project-page-tags">
									{skills?.map((skill, index) => (
										<div key={index} className="project-page-tag">
											<span>{skill}</span>
											{isEditing && (
												<span>
													<Button
														className="removeSkill"
														icon={<DeleteFilled />}
														onClick={e => this.removeSkill(skill)}
													/>
												</span>
											)}
										</div>
									))}
								</div>

								{isEditing && (
									<div>
										<Input
											value={newSkill}
											name="newSkill"
											className="inputEntry"
											placeholder="New Skill"
											onChange={this.onEditChange}
										/>
										<Button
											icon={<PlusCircleFilled />}
											className="addSkill"
											onClick={this.addSkill}
										/>
									</div>
								)}
							</div>
						)}
						{currentTab === "projects" && (
							<div className="project-page-info-block shadow-cust rounded">
								<div className="project-page-info-block-title">
									<span>Owned Projects</span>
									{loginName === userName && (
										<Link to={{ pathname: "/newProject" }}>
											<Button className="rounded" size="medium">
												Create Project
											</Button>
										</Link>
									)}
								</div>

								<SimpleList
									isAdmin={false}
									pathname={"/project"}
									data={ownedProjects}
									isProject={true}
								/>

								<div className="project-page-info-block-title">
									<span>Joined Projects</span>
								</div>

								<SimpleList
									isAdmin={false}
									pathname={"/project"}
									data={joinedProjects}
									isProject={true}
								/>
							</div>
						)}
						{this.state.currentTab === "experiences" && (
							<div className="project-page-info-block shadow-cust rounded">
								<div className="project-page-info-block-title">
									<span>Experiences & Education</span>
								</div>

								{experiences.map((exp, index) => (
									<div key={ index} className="project-page-owner">
										<div className="project-page-owner-name-span">
											<div>
												<span>
													<strong>{exp.company} |</strong> {exp.position}
												</span>
												<br></br>
												<span>
													From {exp.start} to {exp.end}
												</span>
											</div>
										</div>
										{isEditing && (
											<Button
												onClick={e => this.deleteExperience(exp)}
												className="rounded"
												size="medium"
												danger
											>
												Delete
											</Button>
										)}
									</div>
								))}
								{isEditing && (
									<div className="project-page-owner">
										<div className="project-page-owner-name-span">
											{" "}
											<span>
												<Input
													className="inputEntry"
													placeholder="Company"
													value={newCompany}
													name="newCompany"
													onChange={this.onEditChange}
												/>{" "}
												<strong>|</strong>{" "}
												<Input
													className="inputEntry"
													placeholder="Position"
													value={newPosition}
													name="newPosition"
													onChange={this.onEditChange}
												/>
											</span>
											<br />
											<span>
												From{" "}
												<Input
													className="dateEntry"
													type="date"
													value={newStart}
													name="newStart"
													onChange={this.onEditChange}
												/>{" "}
												to{" "}
												<Input
													className="dateEntry"
													type="date"
													value={newEnd}
													name="newEnd"
													onChange={this.onEditChange}
												/>
											</span>
										</div>
										<Button
											className="rounded"
											size="medium"
											onClick={this.addExperience}
										>
											{" "}
											Add{" "}
										</Button>
									</div>
								)}
							</div>
						)}

						{this.state.currentTab === "manage" && (
							<div className="project-page-info-block shadow-cust rounded">
								<div className="project-page-info-block-title">
									<span>Connections</span>
								</div>
								{this.state.friends.map(
									(member, i) => (
										<div key={i} className="project-page-owner">
											<Avatar
												className="simplecard-avatar"
												size={40}
												icon={<UserOutlined />}
											/>
											<div className="project-page-owner-name-span">
													<span>{member.userName}</span>
											</div>
											{ isProfile && (<Button
												className="rounded"
												size="medium"
												danger
												onClick={() => this.deleteFriend(member)}
											>
												Remove
											</Button>)}
										</div>
									)
								)}

								{isProfile && (
									<div>
										<div className="project-page-info-block-title">
											<span>Requests</span>
										</div>
										{this.state.friendRequests.map(
											(member, i) => (
												<div key={i} className="project-page-owner">
													<Avatar
														className="simplecard-avatar"
														size={40}
														icon={<UserOutlined />}
													/>
													<div className="project-page-owner-name-span">
														
															<span>{member.userName}</span>
													</div>
													
													<div className="project-page-margin">
														<Button
																className="rounded"
																size="medium"
																onClick={() => this.replyFriendRequest(member, true)}
															>
															Accept
														</Button>
													</div>
													
													<div className="project-page-margin">
														<Button
																className="rounded"
																size="medium"
																danger
																onClick={() => this.replyFriendRequest(member, false)}
															>
															Reject
														</Button>
													</div>

													
												</div>
											)
										)}
									</div>
								)}
							</div>
						)}
					</div>
				</Layout>
			</div>
		);
	}
}

export default withRouter(Profile);
