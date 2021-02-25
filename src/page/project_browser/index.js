import React, { Component } from "react";

import "./style.css";
import Layout from "../../components/layout";
import Grid from "../../components/list";
import Card from "../../components/card";

export default class ProjectBrowser extends Component {
	render() {
		return (
			<div>
				<Layout>
					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							marginTop: "10px",
						}}
					>
						<Grid
							grid={{ space: 10, column: 4 }}
							dataSource={[...Array(10).keys()]}
							renderItem={item => (
								<Card>
									<a href="/project">{item}</a>
								</Card>
							)}
						/>
					</div>
				</Layout>
			</div>
		);
	}
}
