import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
export default class SearchBar extends Component {
	render() {
		return (
			<Form>
				<Form.Row>
					<Col md="10">
						<Form.Control placeholder="Enter project name" />
					</Col>
					<Col>
						<Button
							variant="primary"
							type="submit"
							className="float-right"
							md="2"
						>
							Submit
						</Button>
					</Col>
				</Form.Row>
			</Form>
		);
	}
}
