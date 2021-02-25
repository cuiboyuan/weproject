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
import TeammateBrowser from "./TeammateBrowser"
import UserProfile from "./user_profile/UserProfile";

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
					<Route path="/" exact>
						<ProjectBrowserPage isAdmin={authContext.isAdmin}/>
					</Route>
					<Route path="/teammates" exact component={TeammateBrowser} />
					<Route path="/project" exact>
						{authContext.isLoggedIn ? <ProjectDetailPage /> : <Login />}
					</Route>
					<Route path="/loggin">
						{authContext.isLoggedIn ? <Redirect to="/" /> : <Login />}
					</Route>

					<Route path="/user" exact>
						{authContext.isLoggedIn ? <UserProfile auth={authContext}/> : <Login />}
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default Routes;
