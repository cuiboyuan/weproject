import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { GoArrowSmallLeft } from "react-icons/go";

import "./style.css";
import Office from "../../assets/office.svg";
import { useAuthState } from "../../context";
// CREDIT: https://www.iconfont.cn/illustrations/detail?spm=a313x.7781069.1998910419.d9df05512&cid=24182

const InputField = props => {
	return (
		<div className="loggin-input-field">
			<span>{props.title}</span>
			<div className="loggin-input-container rounded">
				<input
					className={`loggin-input-inner ${
						props.hideText ? "loggin-password" : ""
					}`}
					placeholder={props.placeholder}
					value={props.value}
					onChange={props.onChange}
					maxLength={20}
				/>
			</div>
		</div>
	);
};

const Loggin = props => {
	const auth = useAuthState();
	const [type, setType] = useState(props.location.state.type);
	const toggleType = () => setType(type === "CREATE" ? "CREATE" : "SIGNIN");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPwd, setConfirmPwd] = useState("");

	const onSubmit = () => {
		console.log(username, password);
		auth.simpleCheck(username, password);
	};

	return (
		<div className="loggin-view">
			<div className="loggin-view-half loggin-grad-bg">
				<div className="loggin-back-button-container">
					<div
						className="loggin-back-button shadow-strong"
						onClick={() => props.history.goBack()}
					>
						<GoArrowSmallLeft className="loggin-back-button-icon" />
					</div>
					<span>Go back</span>
				</div>
				<img src={Office} className="loggin-img" alt="loggin" />
			</div>
			<div className="loggin-view-half">
				<div className="loggin-form-container">
					{type === "CREATE" ? (
						<>
							<span>Create an account</span>
							<InputField
								title={"Username"}
								placeholder={"Name"}
								onChange={e => setUsername(e.target.value)}
							/>
							<InputField
								title={"Password"}
								placeholder={"8 characters"}
								onChange={e => setPassword(e.target.value)}
								hideText={true}
							/>
							<InputField
								title={"Confirm password"}
								placeholder={"Confirm your password"}
								onChange={e => setConfirmPwd(e.target.value)}
								hideText={true}
							/>
							<div className="loggin-switch-type">
								Already have an account?
								<div className="loggin-switch-type-link" onClick={toggleType}>
									Sign In
								</div>
							</div>
							<div className="loggin-input-submit rounded shadow">
								Create an account
							</div>
						</>
					) : (
						<>
							<span>Sign In</span>
							<InputField
								title={"Username"}
								placeholder={"Name"}
								onChange={e => setUsername(e.target.value)}
							/>
							<InputField
								title={"Password"}
								hideText={true}
								placeholder={"8 characters"}
								onChange={e => setPassword(e.target.value)}
							/>
							<div className="loggin-switch-type">
								<div className="loggin-switch-type-link" onClick={toggleType}>
									Create a new account
								</div>
							</div>
							<div
								className="loggin-input-submit rounded shadow"
								onClick={onSubmit}
							>
								Sign In
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default withRouter(Loggin);
