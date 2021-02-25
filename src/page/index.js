import React from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import { useAuthState } from "./../context";

import ProjectBrowserPage from "./project_browser";
import ProjectDetailPage from "./project";
import Login from "./loggin_page";
import Header from "../components/header";

const header = [
	{
		name: "Projects",
		url: "/",
	},
	{
		name: "Teammates",
		url: "/teammates",
	},
];

const Routes = props => {
	const authContext = useAuthState();
	return (
		<Router>
			<div className="App">
				<Header
					authInfo={authContext}
					routes={header}
					logout={authContext.logout}
				/>
				<Switch>
					<Route path="/" exact component={ProjectBrowserPage} />
					{/* <Route path="/teammates" exact component={} /> */}
					<Route path="/project" exact>
						{authContext.isLoggedIn ? <ProjectDetailPage /> : <Login />}
					</Route>
					<Route path="/loggin">
						{authContext.isLoggedIn ? <Redirect to="/" /> : <Login />}
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default Routes;
