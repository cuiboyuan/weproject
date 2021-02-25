import React, { Component } from "react";
import { /*  CardDeck, */ Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineFileImage } from "react-icons/ai";

import "./style.css";

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
				<Col
					className={`simpplecard simplecard-nopad ${
						this.props.isLast ? "" : "simplecard-not-last"
					}`}
				>
					<Link to={{ pathname: data.pathname, state: { data: data } }}>
						{/* <span className="simplecard-see-more"> See more</span>{" "} */}

						<Card>
							<div className="simplecard-img-container rounded">
								<AiOutlineFileImage />
							</div>
							<div className="p-4">
								<Card.Title>{projectName}</Card.Title>
							</div>
							<Card.Body className="simplecard-description">
								{projectDiscription}
							</Card.Body>
							{/* <Card.Footer>
							<Button variant="primary" size="sm" className="float-left">
								<Link to={{ pathname: data.pathname, state: { data: data } }}>
									<span className="simplecard-see-more"> See more</span>{" "}
								</Link>
							</Button>
						</Card.Footer> */}
						</Card>
					</Link>
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
