import React, { Component } from "react";

import "./App.css";
import { ProjectBrowserPage } from "./page";
import Header from "./components/header";

const routes = [
	{
		name: "Projects",
		url: "",
	},
	{
		name: "Teammates",
		url: "",
	},
];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
		};
	}
	render() {
		return (
			<div className="App">
				<Header
					activeIndex={this.state.activeIndex}
					routes={routes}
					onSelect={(index) => this.setState({ activeIndex: index })}
				/>
				<ProjectBrowserPage />
			</div>
		);
	}
}

export default App;
