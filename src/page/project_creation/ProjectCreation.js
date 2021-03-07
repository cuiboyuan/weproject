import React, { Component } from "react";
import Layout from "../../components/layout";
import {
	ArrowLeftOutlined,
	DeleteFilled,
	PlusCircleFilled,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import TeamSvg from "../../assets/team.svg";
import { Button } from "antd";

import {Link, Redirect} from "react-router-dom";

import "./style.css";
import {Input, notification} from "antd";
import TextArea from "antd/lib/input/TextArea";
import uuid from "react-uuid";
import { Project } from "../../model";
import ProjectCreate from '../project_create';

class ProjectCreation extends Component {
	constructor(props) {
		super(props);
		const {auth, allUsers} = this.props;
		const loginName = auth.userName;
		const loginUser = allUsers.users.filter((item) => item.userName === loginName)[0];

		this.state = {
			loginName: loginName,
			loginUser: loginUser,

            projectName: "",
			projectDetail: '',
			projectTags: [],
			newTag: "",
		};
	}

	saveProject = e => {
		console.log(e)
		const newProjectId = uuid();
		this.state.loginUser.ownedProjectIds.push(newProjectId);
		
		let newUsers = this.props.allUsers.users.map((item) => {
			if (item.userName === this.state.loginName){
				return this.state.loginUser;
			}
			return item;
		});

		let newProjects = this.props.allProjects.projects;
		newProjects.push(new Project(
			newProjectId,
			this.state.loginUser,
			e.name,
			e.description,
			e.requirement,
			undefined,
			undefined,
			undefined,
			e.tags,
			{ current: 0, steps: e.steps },
		));

		this.props.allUsers.setUsers(newUsers);
		this.props.allProjects.setProjects(newProjects);
		
		notification['success']({
			message: `Project ${this.state.projectName} Created!`
		});

		// return <Redirect to="/" />
		this.props.history.push('/');
	}
		
	onEditChange = e => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		this.setState({[name]: value});
	}

	removeTag = tag => {
		let tags = this.state.projectTags.filter(item => item !== tag);
		this.setState({projectTags: tags});
	}

	addTag = e => {
		let tag = this.state.newTag;
		let tags = this.state.projectTags;
		if (!tags.includes(tag)){
			tags.push(tag);
			this.setState({projectTags: tags});
			this.setState({newTag: ''})
		}
	}

	
    
	render() {

		const {projectName, projectDetail, projectTags, newTag} = this.state;
        
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
								<div className="project-page-name">New Project</div>
								{/* <div className="project-page-margin">

                                    <Button className="rounded" size="medium" type="primary" onClick={this.saveProject}>
                                        Create the project!
                                    </Button>
								</div> */}
							</div>
						</div>

                        
						{/* <div className="project-page-info-block shadow-cust rounded">
							<div className="project-page-info-block-title">
								<span>Project Name</span>
							</div>
							<Input value={projectName} name='projectName' className='projectName' placeholder="Give your project a name!" onChange={this.onEditChange}/>

							<div className="project-page-info-block-title">
								<span>Project Detail</span>
							</div>
							<TextArea value={projectDetail} name='projectDetail' id='bio' placeholder='Describe your project!' onChange={this.onEditChange}/>

							<div className="project-page-info-block-title">
								<span>Project Tags</span>
							</div>
							
							<div className="project-page-tags">
								{projectTags.map(tag => (
									<div className="project-page-tag">
										<span>{tag}</span>
										<span><Button className='removeSkill' icon={<DeleteFilled/>} onClick={e => this.removeTag(tag)}/></span>
									</div>
								))}
							</div>

							<div>
								<Input value={newTag} name='newTag' placeholder='New Tag' className='inputEntry' onChange={this.onEditChange}/>
								<Button icon={<PlusCircleFilled/>} className='addSkill' onClick={this.addTag}/>
							</div>
							
						</div> */}
						<ProjectCreate onCreate={project => this.saveProject(project)} />
					</div>
				</Layout>
			</div>
		);
	}
}

export default withRouter(ProjectCreation);
