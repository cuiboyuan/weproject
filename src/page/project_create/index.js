import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { Button, Input } from "antd";
import {
	ArrowLeftOutlined,
	UserOutlined,
	RiseOutlined,
	ReadOutlined,
	TeamOutlined,
	ControlOutlined,
	LikeOutlined,
	CloseOutlined,
} from "@ant-design/icons";

import "./style.css";
import Layout from "../../components/layout";

const InputItem = ({ title, placeholder, type }) => {
	return (
		<div className="project-create-sub-container">
			<span>{title}</span>
			{type === "input" && <Input placeholder={placeholder} />}
			{type === "text" && <Input.TextArea placeholder={placeholder} />}
		</div>
	);
};

const Tag = ({ value, onDelete }) => {
	return (
		<div className="project-create-sub-tag-container">
			<span className="project-create-sub-tag-value">{value}</span>
			<div className="project-create-sub-tag-close" onClick={onDelete}>
				<CloseOutlined className="project-create-sub-tag-value" />
			</div>
		</div>
	);
};

const Tags = ({ tagList, onConfirm, onDelete }) => {
	const [tagValue, setTagValue] = useState("");
	return (
		<div className="project-create-sub-container project-create-container">
			<span>Tags</span>
			<div className="project-create-tags-container">
				{tagList?.map((t, index) => (
					<Tag key={index} value={t} onDelete={() => onDelete(index)} />
				))}
				<Input
					placeholder="Type the tags"
					value={tagValue}
					onChange={e => setTagValue(e.target.value)}
					style={{ width: "20%" }}
					onPressEnter={e => {
						onConfirm(e.target.value);
						setTagValue("");
					}}
				/>
			</div>
		</div>
	);
};

const ProgressItem = ({ step }) => {
	return (
		<div className="project-create-progress-item rounded shadow-cust">
			<span className="project-create-progress-step rounded">
				Step {step.index + 1}
			</span>
			<span>{step.title}</span>
			{step.subitems.map(t => (
				<span className="project-create-progress-subitem">{t}</span>
			))}
		</div>
	);
};

const Progress = ({ steps, onUpdate }) => {
	return (
		<div className="project-create-sub-container project-create-container">
			<span>Progress</span>
			<div className="project-create-steps-container">
				{steps?.map((step, index) => (
					<ProgressItem key={index} step={{ ...step, index: index }} />
				))}
			</div>
		</div>
	);
};

const Create = props => {
	const [project, setProject] = useState({});
	const addTag = value => {
		setProject({ ...project, tags: [...(project.tags || []), value] });
	};
	const delTag = index => {
		let tags = project.tags || [];
		tags.splice(index, 1);
		setProject({ ...project, tags: tags });
	};
	return (
		<Layout>
			<div className="project-c-container">
				<div className="project-create-container project-create-row-spread">
					<Button size="large" onClick={() => props.history.goBack()}>
						back
					</Button>
					<span className="project-create-title">Create a new project</span>
					<div />
				</div>
				<InputItem
					type="input"
					title="Project Name"
					placeholder={"Super cool project"}
				/>
				<Tags tagList={project?.tags} onConfirm={addTag} onDelete={delTag} />
				<InputItem
					type="text"
					title="Description"
					placeholder={"Describe your project and the expectation."}
				/>
				<InputItem
					type="text"
					title="Member Requirement"
					placeholder={"Describe your recruit requirement."}
				/>
				<Progress
					steps={[
						{
							title: "title 1",
							subitems: ["step 1", "step 2", "step 3"],
						},
						{ title: "title 1", subitems: ["step 1", "step 2"] },
					]}
				/>
				<div className="project-create-container">
					<Button
						size="large"
						onClick={() => props.history.goBack()}
						type="primary"
					>
						Create
					</Button>
				</div>
			</div>
		</Layout>
	);
};

export default withRouter(Create);
