import React from "react";
import { Link } from "react-router-dom";
import { Popover } from "antd";

import "./style.css";

const Popup = props => {
	return (
		<div className="auth-popup">
			<p>Profile</p>
			<p>My projects</p>
			<p className="auth-loggout" onClick={props.onClick}>Log out</p>
		</div>
	);
};

const Auth = props => {
	return (
		<div className="auth-container">
			{props.authInfo?.isLoggedIn ? (
				<>
					<Popover content={() => <Popup onClick={props.logout}/>} placement="bottomRight" title="">
						<span>{props.authInfo.userName}</span>
					</Popover>
				</>
			) : (
				<div className="auth-sign-in">
					<span>
						<Link to={{ pathname: "/loggin", state: { type: "SIGNIN" } }}>
							Sign In
						</Link>
					</span>
					<div className="rounded">
						<Link to={{ pathname: "/loggin", state: { type: "CREATE" } }}>
							Get Started
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default Auth;
