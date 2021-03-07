import React from "react";
import { Link } from "react-router-dom";
import { Popover, Avatar } from "antd";
import { AiOutlineUser } from "react-icons/ai";

import "./style.css";
import { useUsersState } from '../../context';

const Popup = props => {
	return (
		<div className="auth-popup">
			<Link to={{ pathname: "/profile" }}>
				<p>My profile</p>
			</Link>
			<Link to={{ pathname: "/newProject" }}>
				<p>Create project</p>
			</Link>
			<p className="auth-loggout" onClick={props.onClick}>
				Log out
			</p>
		</div>
	);
};

const Auth = props => {
	const usersContext = useUsersState();
	const index = usersContext.users.findIndex(u => u.userName === props.authInfo.userName);
	const user = index >= 0 ? usersContext.users[index] : undefined;
	return (
		<div className="auth-container">
			{props.authInfo?.isLoggedIn ? (
				<div className="auth-avatar-container">
					<Popover
						content={() => <Popup onClick={props.logout} />}
						placement="bottomRight"
						title=""
					>
						{user.avatar?.url ? <Avatar icon={<AiOutlineUser />} src={user.avatar.url}/> : <Avatar icon={<AiOutlineUser />} />}
						<span>{props.authInfo.userName}</span>
					</Popover>
				</div>
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
