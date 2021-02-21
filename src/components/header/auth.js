import React from "react";

import "./style.css";

const Auth = props => {
	return (
		<div className="auth-container">
			{props.authInfo?.authenticated ? (
				<>{props.authInfo.name}</>
			) : (
				<div className="auth-sign-in">
					<span><a href="/loggin">Sign In</a></span>
					<div className="rounded"><a href="/loggin">Get Started</a></div>
				</div>
			)}
		</div>
	);
};

export default Auth;
