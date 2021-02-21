import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { ProjectBrowserPage, ProjectDetailPage, Login } from "./page";
import Header from "./components/header";

const nav = [
	{
		name: "Projects",
		url: "/",
	},
	{
		name: "Teammates",
		url: "/teammates",
	}
];

const authInfo = { name: "Jerry", authenticated: false };

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header
						authInfo={authInfo}
						routes={nav}
					/>
					<Switch>
						<Route path="/" exact component={ProjectBrowserPage} />
						{/* <Route path="/teammates" exact component={} /> */}
						<Route path="/project" exact component={ProjectDetailPage} />
						<Route path="/loggin" exact component={Login} />

					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
