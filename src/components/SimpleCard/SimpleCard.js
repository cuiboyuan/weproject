import React, { Component } from "react";
import { /*  CardDeck, */ Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// import reactDom from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
export default class SimpleCard extends Component {
	render() {
		const { data, isProject } = this.props;
		//in case there is no content
		if (Object.keys(data).length === 1) {
			return <Col className="col-md-offset-2"></Col>;
		}
		if (isProject) {
			const { projectName, projectDiscription } = data;
			return (
				<Col className="col-md-offset-2">
					<Card>
						<Card.Title>{projectName}</Card.Title>
						<Card.Body>{projectDiscription}</Card.Body>
						<Card.Footer>
							<Button variant="primary" size="sm" className="float-left">
								<Link to={{ pathname: data.pathname, state: { data: data } }}> See more </Link>
							</Button>
							{/* <Button variant="primary" size="sm" className="float-right">
								Join the group
							</Button> */}
						</Card.Footer>
					</Card>
				</Col>
			);
		} else {
			const { peopleName, selfIntro } = data;
			return (
				<Col className="col-md-offset-2">
					<Card>
						<Card.Title>{peopleName}</Card.Title>
						<Card.Body>{selfIntro}</Card.Body>
						<Card.Footer>
							<Button variant="primary" className="float-left">
								See more
							</Button>
							<Button variant="primary" className="float-right">
								Connect
							</Button>
						</Card.Footer>
					</Card>
				</Col>
			);
		}
	}
}
