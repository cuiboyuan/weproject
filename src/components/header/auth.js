import React from "react";
import { Link } from "react-router-dom";
import { Popover } from "antd";

import "./style.css";

const Popup = props => {
	return (
		<div className="auth-popup">
			<Link to={{ pathname: "/user" }}>
				<p>Profile</p>
			</Link>
			<p className="auth-loggout" onClick={props.onClick}>
				Log out
			</p>
		</div>
	);
};

const Auth = props => {
	return (
		<div className="auth-container">
			{props.authInfo?.isLoggedIn ? (
				<>
					<Popover
						content={() => <Popup onClick={props.logout} />}
						placement="bottomRight"
						title=""
					>
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

					<Link to={{ pathname: "/loggin", state: { type: "CREATE" } }}>
						<div className="rounded">Get Started</div>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Auth;
