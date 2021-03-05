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
	MailOutlined,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";

import TeamSvg from "../../assets/team.svg";

import { Avatar, Button, Menu, Input, notification } from "antd";

import "./style.css";
import SimpleList from "../../components/SimpleList/SimpleList";
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import TextArea from "antd/lib/input/TextArea";
import { Project } from "../../model";
import uuid from "react-uuid";


/**
 * To link to this page: <Link to={{pathname: '/user', state:{ username: `username` }}></Link>
 */

class ProjectCreation extends Component {

	constructor(props) {
		super(props);

		const {auth, allUsers, allProjects, location} = this.props;

		// Change to EXTERNAL CALL in phase 2:
		const loginName = auth.userName;
		const loginUser = allUsers.users.filter(item => item.userName == loginName)[0];
		
        const currentName = loginName;
        const currentUser = loginUser;
		
		// Need some modification
		let ownedProjects = allProjects.projects.filter(item => item.owner.userName == currentName);
		let joinedProjects = allProjects.projects.filter(item => currentUser.joinedProjectIds.includes(item.id));

		this.state = {

			loginName: loginName,
            currentUser: currentUser,
			
			// Hard-coded data; Change to get information from server in phase 2
            projectName: "",
            projectDetail: "",
            projectTags: [],
		};
	}
	
	saveNewProject = e => {
        // Phase 2: update this.state value to user data in server
        //...
        const newProjectId = uuid();
        this.state.currentUser.push(newProjectId);
        let newProjects = this.props.allProjects.projects;
        newProjects.push(
            new Project(
                newProjectId,
                this.state.currentUser,
                this.state.projectName,
                this.state.projectDetail,
                undefined,
                undefined,
                undefined,
                this.state.projectTags
            )
        );

        let newUsers = this.props.allUsers.users.map(
            (item) => {
                if (item.userName === this.state.loginName){
                    return this.state.currentUser;
                }
                return item;
            }
        );

        this.props.allProjects.setProjects(newProjects);
        this.props.allUsers.setUsers(newUsers);

        notification['success']({
            message: 'Project Created!'
        });
		
	};

	onEditChange = e => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		this.setState({[name]: value});
	}

    render(){
        return (
            <div>
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
                                New Project
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        )
    }


}

export default withRouter(ProjectCreation);
