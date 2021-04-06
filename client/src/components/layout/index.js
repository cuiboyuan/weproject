import React from "react";

import "./style.css";

const Layout = props => (
	<div className="layout">
		<div className="layout-container">{props.children}</div>
	</div>
);

export default Layout;
