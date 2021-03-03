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
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import TeamSvg from "../../assets/team.svg";

import { Avatar, Button, Menu } from "antd";

import "./style.css";
import SimpleList from "../../components/SimpleList/SimpleList";
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineMail, AiOutlineUser } from "react-icons/ai";

const members = [...Array(3).keys()].map((_, i) => {
	return { userName: `member ${i}` };
});
const applicants = [...Array(4).keys()].map((_, i) => {
	return { userName: `applicant ${i}` };
});


/**
 * To link to this page: <Link to={{pathname: '/user', state:{ username: `username` }}></Link>
 */

class Profile extends Component {

	constructor(props) {
		super(props);

		let {auth, allUsers, allProjects, location} = this.props;
		
		// Change to EXTERNAL CALL in phase 2:
		let loginName = auth.userName;
		let loginUser = allUsers.users.filter(item => item.userName == loginName)[0];
		
		let currentName, currentUser;
		console.log(this.props);

		let isProfile = false;
		if (location.pathname === '/profile'){
			currentName = loginName;
			currentUser = loginUser;
			isProfile = true;
		} else {
			currentName = location.state.username;
			currentUser = allUsers.users.filter(item => item.userName == currentName)[0];
		}
		
		// Need some modification
		let ownedProjects = allProjects.projects.filter(item => item.owner.userName == currentName);
		let joinedProjects = allProjects.projects.filter(item => currentUser.joinedProjectIds.includes(item.id));

		this.state = {
			currentTab: "detail",
			username: currentName,
			loginName: loginName,
			
			// Hard-coded data; Change to get information from server in phase 2
			userBio: `I am ${currentName}.`,
			email: `${currentName}@${currentName}.com`,
			linkedin: `linkedin.com/${currentName}`,
			github: `github.com/${currentName}`,
			skills: ['JavaScript'],

			experiences: [
				{
					company: "University of Toronto",
					position: "Undergraduate",
					start: "2018-09-10",
					end: "2022-06-01",
				},
			],

			newSkill: '',
			newCompany: '',
			newPosition: '',
			newStart: '',
			newEnd: '',

			isEditing: false,

			ownedProjects: ownedProjects,
			joinedProjects: joinedProjects,

			isAdmin: auth.isAdmin,
			isProfile: isProfile,
		};
	}
	handleClick = e => {
		this.setState({ currentTab: e.key });
	};
	
	editProfile = e => {
		if (this.state.isEditing) {
			// TODO: update this.state value to user data
			//...
		}
		this.setState({isEditing: !this.state.isEditing})
	};

	onEditChange = e => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		this.setState({[name]: value});
	}

	addExperience = e => {

		let experiences = this.state.experiences;
		let exp = {
			company: this.state.newCompany,
			position: this.state.newPosition,
			start: this.state.newStart,
			end: this.state.newEnd
		}
		if (!experiences.includes(exp)){
			experiences.push(exp);
			this.setState({experiences: experiences});
		}
	}

	deleteExperience = (exp) => {
		let experiences = this.state.experiences.filter((item) => exp !== item);
		this.setState({experiences: experiences});
	}

	editExperience = (exp, newCompany, newPosition, newStart, newEnd) => {
		let experiences = this.state.experiences.map((item) => {
			if (item === exp){
				item.company = newCompany;
				item.position = newPosition;
				item.start = newStart;
				item.end = newEnd;
			}
		})
		this.setState({experiences: experiences});
	}

	addSkill = e => {
		let skill = this.state.newSkill;
		let skills = this.state.skills;
		if (!skills.includes(skill)){
			skills.push(skill);
			this.setState({skills: skills});
			this.setState({newSkill: ''})
		}
	}

	removeSkill = skill => {
		let skills = this.state.skills.filter(item => item !== skill);
		this.setState({skills: skills});
	}

	render() {
		let {currentTab, username, ownedProjects, joinedProjects, userBio, experiences, github, linkedin, email, skills} = this.state;
		let {isAdmin, isProfile, isEditing, loginName} = this.state
		let {newSkill, newCompany, newPosition, newStart, newEnd} = this.state;
		
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
								<Avatar size={100} icon={<AiOutlineUser />}/>

								<div className="project-page-name">{username}</div>
								<div className="project-page-margin">
									<Button type="text" icon={<LikeOutlined />} />

									{isProfile && (<Button onClick={this.editProfile} className="rounded" size="medium" type="primary">
										{isEditing ? 'Save Changes' : 'Edit Profile'}
									</Button>)}


									{isAdmin && !isProfile && (<Button className="rounded" size="medium" danger>
										Delete
									</Button>)}
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
							<Menu.Item key="experiences" icon={<RiseOutlined/>}>
								Experiences & Education
							</Menu.Item>
							{/* <Menu.Item key="manage" icon={<ControlOutlined />}>
								Manage
							</Menu.Item> */}
						</Menu>
						{currentTab === "detail" && (
							<div className="project-page-info-block shadow-cust rounded">
								<div className="project-page-info-block-title">
									<span>User detail</span>
								</div>

								{isEditing ? <textarea id='bio' value={userBio} name='userBio' onChange={this.onEditChange}/> : <div id="bio"> {userBio} </div>}
								
								<ul id='socialMediaList'>
									<li>
										<Avatar icon={<AiOutlineMail/>}/> 
										{isEditing ? <input value={email} name='email' onChange={this.onEditChange}/> : <span className='socialMedia'> {email} </span>}
									</li>

									<li>
										<Avatar icon={<AiOutlineGithub/>}/> 
										{isEditing ? <input value={github} name='github' onChange={this.onEditChange}/> : <span className='socialMedia'> {github} </span>}
									</li>
									
									<li>
										<Avatar icon={<AiOutlineLinkedin/>}/>
										{isEditing ? <input value={linkedin} name='linkedin' onChange={this.onEditChange}/> : <span className='socialMedia'> {linkedin} </span>}
									</li>
								</ul>

								
								<div className="project-page-info-block-title">
									<span>Skills</span>
								</div>

								<div className="project-page-tags">
									{skills?.map(skill => (
											<div className="project-page-tag">
												<span>{skill}</span>
												{isEditing && (<span><Button className='removeSkill' icon={<DeleteFilled/>} onClick={e => this.removeSkill(skill)}/></span>)}
											</div>
									))}
								</div>

								{isEditing && (
									<div>
										<input value={newSkill} name='newSkill' placeholder='New Skill' onChange={this.onEditChange}/>
										<Button icon={<PlusCircleFilled/>} className='addSkill' onClick={this.addSkill}/>
									</div>
								)}
								


							</div>
						)}
						{currentTab === "projects" && (
							<div className="project-page-info-block shadow-cust rounded">
								<div className="project-page-info-block-title">
									<span>Owned Projects</span>
									{(loginName == username) && (<Button className="rounded" size="medium">Create Project</Button>)}
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
						{this.state.currentTab === "experiences" && (
							<div className="project-page-info-block shadow-cust rounded">
							<div className="project-page-info-block-title">
								<span>Experiences & Education</span>
							</div>

							{experiences.map(exp => 
								<div className="project-page-owner">
									
									<div className="project-page-owner-name-span">
										<div>
											<span><strong>{exp.company} |</strong> {exp.position}</span>
											<br></br>
											<span>From {exp.start} to {exp.end}</span>
										</div>
										{/* {!isEditing ? (
											<div>
												<span><strong>{exp.company} |</strong> {exp.position}</span>
												<br></br>
												<span>{exp.start} - {exp.end}</span>
											</div>
										) : (
											<div>
												<strong><input value={exp.company}/> |</strong> <input value={exp.position}/>
												<br/>
												<input type='date' value={exp.start}/> - <input type='date' value={exp.end}/>
											</div>
										)} */}
									</div>
									{isEditing && (
									<Button onClick={(e) => this.deleteExperience(exp)} className="rounded" size="medium" danger> 
										Delete 
									</Button>)}
								</div>
							)}
							{isEditing &&(
							<div className="project-page-owner">
								
								<div className="project-page-owner-name-span">
									{" "}
									<span>
										<input placeholder="Company" value={newCompany} name='newCompany' onChange={this.onEditChange}/> <strong>|</strong> <input placeholder="Position" value={newPosition} name='newPosition' onChange={this.onEditChange}/>
									</span>
									<br/>
									<span>
										From <input type='date' value={newStart} name='newStart' onChange={this.onEditChange}/> to <input type='date' value={newEnd} name='newEnd' onChange={this.onEditChange}/> 
									</span>
								</div>
								<Button className="rounded" size="medium" onClick={this.addExperience}> Add </Button>
							</div>)}
						</div>
						)}

						{this.state.currentTab === "manage"}
					</div>
				</Layout>
			</div>
			
		);
	}
}

export default withRouter(Profile);
