import React, { Component } from "react";
import { /*  CardDeck, */ Col, Card, Button } from "react-bootstrap";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import {
	AiOutlineFileImage,
	AiOutlineEye,
	AiOutlineTeam,
	AiOutlineLike,
	AiOutlineDelete,
	AiOutlineToTop,
} from "react-icons/ai";
import { UserOutlined } from "@ant-design/icons";
// credit: https://react-icons.github.io/react-icons/;

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
							<div className="simplecard-name">
								<Card.Title>{projectName}</Card.Title>
							</div>
							<Card.Body className="simplecard-description">
								<div className="simplecard-username-container">
									<Avatar
										className="simplecard-avatar"
										icon={<UserOutlined />}
									/>
									<span>{data.owner.username}</span>
								</div>
								<p>{projectDiscription}</p>
								<div className="simplecard-info-container">
									<div className="simplecard-info-left">
										<div className="simplecard-icon">
											<AiOutlineEye />
											<span>10</span>
										</div>
										<div className="simplecard-icon">
											<AiOutlineTeam />
											<span>10</span>
										</div>
										<div className="simplecard-icon">
											<AiOutlineLike /> <span>10</span>
										</div>
									</div>
									{this.props.isAdmin && (
										<div className="simplecard-info-left">
											<div className="simplecard-icon-admin">
												<AiOutlineToTop />
											</div>
											<div className="simplecard-icon-admin">
												<AiOutlineDelete />
											</div>
										</div>
									)}
								</div>
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
			const { peopleName, peopleDiscription } = data;
			return (
				<Col className="col-md-offset-2">
					<Card>
						<Card.Title>{peopleName}</Card.Title>
						<Card.Body>{peopleDiscription}</Card.Body>
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
