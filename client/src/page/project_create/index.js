import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { Button, Input, notification } from "antd";
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
import { BsX, BsPencilSquare, BsXSquare } from "react-icons/bs";

import "./style.css";
import Layout from "../../components/layout";

const InputItem = ({ title, placeholder, type, onChange, value }) => {
	return (
		<div className="project-create-sub-container">
			<span>{title}</span>
			{type === "input" && <Input placeholder={placeholder} value={value} onChange={onChange}/>}
			{type === "text" && <Input.TextArea placeholder={placeholder} value={value} onChange={onChange}/>}
		</div>
	);
};

const Tag = ({ value, onDelete }) => {
	return (
		<div className="project-create-sub-tag-container">
			<span className="project-create-sub-tag-value">{value}</span>
			<div className="project-create-sub-tag-close" onClick={onDelete}>
				<BsX className="project-create-sub-tag-value" />
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
						if (e.target.value !== "") {
							onConfirm(e.target.value);
							setTagValue("");
						}
					}}
				/>
			</div>
		</div>
	);
};

const ProgressItem = ({ step, onDelete, onEdit }) => {
	const [show, setShow] = useState(false);
	const [edit, setEdit] = useState(false);
	return edit ? (
		<ProgressAdd
			item={step}
			buttonText="Update"
			onAdd={step => {
				onEdit(step);
				setEdit(false);
			}}
		/>
	) : (
		<div
			className="project-create-progress-item rounded shadow-cust"
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
		>
			<span className="project-create-progress-step rounded">
				Step {step.index + 1}
				{show && (
					<div>
						<BsPencilSquare
							className="project-create-editable-icon"
							onClick={() => setEdit(true)}
						/>
						<BsXSquare
							className="project-create-editable-icon"
							onClick={onDelete}
						/>
					</div>
				)}
			</span>
			<span>{step.title}</span>
			{step.subitems.map((t, index) => (
				<span key={index} className="project-create-progress-subitem">{t}</span>
			))}
		</div>
	);
};

const ProgressAdd = ({ item, onAdd, buttonText }) => {
	const [step, setStep] = useState(item || { title: "", subitems: [] });
	const [value, setValue] = useState("");
	const onClickAdd = props => {
		onAdd(step);
		setStep({ title: "", subitems: [] });
		setValue("");
	};
	const onCompleteSubitem = (index, value) => {
		let subitems = step.subitems;
		subitems.splice(index, 1, value);
		setStep({ ...step, subitems: subitems });
	};
	const onEditSubitem = e => {
		setStep({
			...step,
			subitems: [...(step.subitems || []), e.target.value],
		});
		setValue("");
	};
	return (
		<div className="project-create-sub-container project-create-sub-border rounded">
			<span>Step Title</span>
			<Input
				placeholder="Title"
				value={step.title}
				onChange={e => setStep({ ...step, title: e.target.value })}
			/>
			<span>Sub-steps</span>
			{step.subitems?.map((t, index) => (
				<EditableText
					key={index}
					value={t}
					onPressEnter={value => onCompleteSubitem(index, value)}
					onDelete={() => {
						let subitems = step.subitems;
						subitems.splice(index, 1);
						setStep({ ...step, subitems: subitems });
					}}
				/>
			))}
			{step.subitems.length < 3 && (
				<Input
					value={value}
					onChange={e => setValue(e.target.value)}
					placeholder="sub-steps"
					onPressEnter={onEditSubitem}
				/>
			)}
			<button
				className="project-create-button"
				onClick={onClickAdd}
				disabled={step.title === "" || step.subitems.length === 0}
			>
				{buttonText || "Add"}
			</button>
		</div>
	);
};

const EditableText = props => {
	const [value, setValue] = useState(props.value);
	const [edit, setEdit] = useState(false);
	return edit ? (
		<Input
			value={value}
			onChange={e => setValue(e.target.value)}
			onBlur={() => {
				if (value === "") {
					props.onDelete();
				} else {
					props.onPressEnter(value);
					setEdit(false);
				}
			}}
			onPressEnter={() => {
				if (value === "") {
					props.onDelete();
				} else {
					props.onPressEnter(value);
					setEdit(false);
				}
			}}
		/>
	) : (
		<div className="project-create-editable">
			<span>{props.value}</span>
			<div>
				<BsPencilSquare
					className="project-create-editable-icon"
					onClick={() => setEdit(true)}
				/>
				<BsXSquare
					className="project-create-editable-icon"
					onClick={props.onDelete}
				/>
			</div>
		</div>
	);
};

const Progress = ({ steps, onAdd, onDelete, onEdit }) => {
	return (
		<div className="project-create-sub-container project-create-container">
			<span>Progress</span>
			<div className="project-create-steps-container">
				{steps?.map((step, index) => (
					<ProgressItem
						key={index}
						step={{ ...step, index: index }}
						onDelete={() => onDelete(index)}
						onEdit={step => {
							let newSteps = steps;
							newSteps.splice(index, 1, step);
							onEdit(newSteps);
						}}
					/>
				))}
			</div>
			<ProgressAdd onAdd={onAdd} />
		</div>
	);
};

const Create = props => {
	const [project, setProject] = useState(props.data ? { ...props.data, steps: props.data.progress?.steps || [] } : {});
	const addTag = value => {
		setProject({ ...project, tags: [...(project.tags || []), value] });
	};
	const delTag = index => {
		let tags = project.tags || [];
		tags.splice(index, 1);
		setProject({ ...project, tags: tags });
	};
	const onSubmit = () => {
		if (!project.name || project.name === "") {
			notification["warning"]({
				message: `Please type your project name.`,
			});
		} else if (!project.description || project.description === "") {
			notification["warning"]({
				message: `Please type your project description.`,
			});
		} else if (!project.requirement || project.requirement === "") {
			notification["warning"]({
				message: `Please type your project requirement.`,
			});
		// } else if (!project.tags || project.tags.length === 0) {
		} else if (false) {
			notification["warning"]({
				message: `Please type your project tags.`,
			});
		// } else if (!project.steps || project.steps.length === 0) {
		} else if (false) {
			notification["warning"]({
				message: `Please type your project steps.`,
			});
		} else {
			props.onCreate(project);
		}
	};
	return (
		<div className="project-c-container">
			{/* <div className="project-create-container project-create-row-spread">
					<Button size="large" onClick={() => props.history.goBack()}>
						back
					</Button>
					<span className="project-create-title">Create a new project</span>
					<div />
				</div> */}
			<InputItem
				type="input"
				title="Project Name"
				value={project.name}
				onChange={e => setProject({ ...project, name: e.target.value })}
				placeholder={"Super cool project"}
			/>
			<Tags tagList={project?.tags} onConfirm={addTag} onDelete={delTag} />
			<InputItem
				type="text"
				title="Description"
				value={project.description}
				onChange={e => setProject({ ...project, description: e.target.value })}
				placeholder={"Describe your project and the expectation."}
			/>
			<InputItem
				type="text"
				title="Member Requirement"
				value={project.requirement}
				onChange={e => setProject({ ...project, requirement: e.target.value })}
				placeholder={"Describe your recruit requirement."}
			/>
			<Progress
				steps={project?.steps || []}
				onAdd={step =>
					setProject({ ...project, steps: [...(project.steps || []), step] })
				}
				onEdit={steps =>
					setProject({
						...project,
						steps: steps,
					})
				}
				onDelete={index => {
					let steps = project.steps;
					steps.splice(index, 1);
					setProject({ ...project, steps: steps });
				}}
			/>
			<Button size="large" onClick={onSubmit} type="primary">{props.data ? "Edit" : "Create"}</Button>
		</div>
	);
};

export default withRouter(Create);
