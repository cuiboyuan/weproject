import React from "react";

import "./style.css";

const Logo = props => (
	<div className="logo-container">
		<div className="logo rounded" onClick={props.onClick}>
			<a href="/">WeProject</a>
			{/* <span>WeProject</span> */}
		</div>
	</div>
);

export default Logo;
