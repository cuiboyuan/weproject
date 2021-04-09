import React, { Component, useCallback } from "react";
import {
	ArrowLeftOutlined,
	UserOutlined,
	RiseOutlined,
	ReadOutlined,
	TeamOutlined,
	ControlOutlined,
	LikeOutlined,
} from "@ant-design/icons";
import { AiOutlinePicture } from "react-icons/ai";
import { withRouter, Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Avatar, Button, Menu, Input, notification } from "antd";

import "./style.css";
import Layout from "../../components/layout";
import TeamSvg from "../../assets/team.svg";
import Progress from "./progress";
import ProjectCreate from "../project_create";

const { TextArea } = Input;


const FileUpload = ({ onDrop, accept }) => {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept,
	});
	return (
		<div
			className={`project-upload-container ${
				isDragActive ? "project-upload-container-active" : ""
			}`}
			{...getRootProps()}
		>
			<input multiple {...getInputProps()} />
			<AiOutlinePicture />
			<span>Upload</span>
		</div>
	);
};

class Project extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.location.state.data,
			editing: false,
			admin:
				this.props.location.state.data.owner.userName ===
					this.props.authContext.userName || this.props.authContext.isAdmin,
			currentTab: "detail",
		};
	}
	handleClick = e => {
		this.setState({ currentTab: e.key });
	};
	onFileUpload = files => {
		let _files = files;
		let fileObjects = _files.map(file => {
			return { name: file.name, url: URL.createObjectURL(file) };
		});
		let newData = {
			...this.state.data,
			images: [...(this.state.data.images || []), ...fileObjects],
		};
		this.props.projectsContext
			.uploadProjectImage(this.state.data, files[0])
			.then(res => {
				if (res.status === 200) {
					console.log("Image upload success!")
					this.setState({ data: newData });
				} else {
					console.error(res);
				}
			})
			.catch(err => console.error(err));
	};

	removeMember = userName => {
		let project = this.state.data;
		project.members = project.members.filter(a => a !== userName);
		this.setState({ data: project });
		this.props.projectsContext.updateProject(project);
	};

	removeApplicant = userName => {
		let project = this.state.data;
		project.applicants = project.applicants.filter(a => a !== userName);
		this.setState({ data: project });
		this.props.projectsContext.updateProject(project);
	};

	acceptApplicant = userName => {
		let project = this.state.data;
		project.applicants = project.applicants.filter(a => a !== userName);
		project.members = [...(project.members || []), userName];
		this.setState({ data: project });
		this.props.projectsContext.updateProject(project);
	};

	render() {
		const data = this.state.data;

		console.log("project");
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
						{!this.state.editing && (
							<>
								<div className="project-page-info">
									<div className="project-admin-control">
										<div className="project-page-name">{data.name}</div>
										<div className="project-page-margin">
											{/* <Button type="text" icon={<LikeOutlined />} /> */}
											{!this.state.admin &&
												!(data.members || []).includes(
													this.props.authContext.userName
												) &&
												!(data.applicants || []).includes(
													this.props.authContext.userName
												) && (
													<Button
														className="rounded"
														size="medium"
														type="primary"
														onClick={() => {
															this.props.projectsContext.joinProject(
																data.id,
																this.props.authContext.userName
															);
															this.setState({
																data: {
																	...data,
																	applicants: [
																		...(data.applicants || []),
																		this.props.authContext.userName,
																	],
																},
															});
															notification["success"]({
																message: `Sent join application`,
															});
														}}
													>
														Join the project
													</Button>
												)}
											{!this.state.admin &&
												((data.members || []).includes(
													this.props.authContext.userName
												) ||
													(data.applicants || []).includes(
														this.props.authContext.userName
													)) && (
													<Button
														className="rounded"
														size="medium"
														type="primary"
														disabled={true}
													>
														Sent application!
													</Button>
												)}
											{this.state.admin && (
												<Button
													className="rounded"
													size="medium"
													onClick={() => this.setState({ editing: true })}
												>
													Edit project
												</Button>
											)}
											{this.state.admin && (
												<Button
													className="rounded"
													size="medium"
													danger
													onClick={() => {
														this.props.projectsContext.deleteProject(data.id);
														this.props.usersContext.removeProject(
															data.owner.userName,
															data.id
														);
														this.props.history.push("/");
													}}
												>
													Delete
												</Button>
											)}
										</div>
									</div>
									<div className="project-page-tags">
										{data.tags?.map((tag, index) => (
											<div key={index} className="project-page-tag">
												{tag}
											</div>
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
									{this.state.admin && (
										<Menu.Item key="manage" icon={<ControlOutlined />}>
											Manage
										</Menu.Item>
									)}
								</Menu>
								{this.state.currentTab === "detail" && (
									<div className="project-page-info-block shadow-cust rounded">
										<div className="project-page-info-block-title">
											<span>Project Description</span>
										</div>
										<p>{data.description}</p>
										<div className="project-page-info-block-title">
											<span>Project Requirement</span>
										</div>
										<p>{data.requirement}</p>
										<div className="project-page-info-block-title">
											<span>Project Images</span>
										</div>
										{this.state.admin && (
											<FileUpload
												onDrop={this.onFileUpload}
												accept={"image/*"}
											/>
										)}
										<div className="project-page-image-container">
											{(data.images || []).map((img, index) => (
												<img key={index} src={img.url} alt={img.name} />
											))}
										</div>
									</div>
								)}
								{this.state.currentTab === "team" && (
									<div className="project-page-info-block shadow-cust rounded">
										<div className="project-page-info-block-title">
											<span>Team members</span>
										</div>

										{[data.owner.userName, ...(data.members || [])].map(
											(member, i) => (
												<div key={i} className="project-page-owner">
													<Avatar
														className="simplecard-avatar"
														size={40}
														icon={<UserOutlined />}
													/>
													<div className="project-page-owner-name-span">
														<span>{member}</span>
													</div>
													{i === 0 && (
														<span className="project-owner-badge">owner</span>
													)}
													{i !== 0 && (
														<div className="project-page-margin">
															{this.state.admin && (
																<Button
																	className="rounded"
																	size="medium"
																	danger
																	onClick={() => this.removeMember(member)}
																>
																	Remove
																</Button>
															)}
														</div>
													)}
												</div>
											)
										)}
									</div>
								)}
								{this.state.currentTab === "progress" && (
									<div className="project-page-info-block shadow-cust rounded">
										<div className="project-page-info-block-title">
											<span>Current Progress</span>
											{this.state.admin && (
												<div className="project-page-margin">
													<Button
														className="rounded"
														size="medium"
														type="primary"
														disabled={
															(data.progress?.current || 0) >=
															(data.progress?.steps || []).length
														}
														onClick={() => {
															console.log(data.progress);
															this.props.projectsContext.proceedStep(data.id);
															this.setState({
																data: {
																	...data,
																	progress: {
																		...data.progress,
																		current: (data.progress.current || 0) + 1,
																	},
																},
															});
														}}
													>
														Proceed
													</Button>
													<Button
														className="rounded"
														size="medium"
														danger
														disabled={data.progress?.current <= 0}
														onClick={() => {
															this.props.projectsContext.withdralStep(data.id);
															this.setState({
																data: {
																	...data,
																	progress: {
																		...data.progress,
																		current: data.progress.current - 1,
																	},
																},
															});
														}}
													>
														Withdraw
													</Button>
												</div>
											)}
										</div>
										<Progress
											current={data.progress?.current}
											items={data.progress?.steps || []}
										/>
									</div>
								)}
								{this.state.currentTab === "manage" && (
									<>
										<div className="project-page-info-block shadow-cust rounded">
											<div className="project-page-info-block-title">
												<span>Project Applicants</span>
											</div>
											{(data.applicants || []).map((member, index) => (
												<div key={index} className="project-page-owner">
													<Avatar
														className="simplecard-avatar"
														size={40}
														icon={<UserOutlined />}
													/>
													<div className="project-page-owner-name-span">
														<span>{member}</span>
													</div>
													<Button
														className="rounded"
														size="medium"
														onClick={() => this.acceptApplicant(member)}
													>
														Accept
													</Button>
													<Button
														className="rounded"
														size="medium"
														danger
														onClick={() => this.removeApplicant(member)}
													>
														Reject
													</Button>
												</div>
											))}
										</div>
									</>
								)}
							</>
						)}
						{this.state.editing && (
							<ProjectCreate
								data={this.state.data}
								onCreate={project => {
									let newProject = {
										...this.state.data,
										name: project.name,
										description: project.description,
										requirement: project.requirement,
										tags: project.tags,
										progress: { current: 0, steps: project.steps },
									};
									this.setState({
										data: newProject,
										editing: false,
									});
									this.props.projectsContext.updateProject(newProject);
									console.log(newProject);
								}}
							/>
						)}
					</div>
				</Layout>
			</div>
		);
	}
}

export default withRouter(Project);
