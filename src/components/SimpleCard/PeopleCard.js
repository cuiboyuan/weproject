import React, { Component } from "react";
import { /*  CardDeck, */ Col, Card, Button } from "react-bootstrap";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import {
	AiOutlineFileImage,
	AiOutlineTeam,
	AiOutlineDelete,
	AiOutlineToTop,
    AiOutlineUserAdd
} from "react-icons/ai";
import { UserOutlined } from "@ant-design/icons";
// credit: https://react-icons.github.io/react-icons/;

import "./style.css";

// import reactDom from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
	
const PeopleCard = ({isAdmin, data, pathname})=>{
            console.log(isAdmin);
			return (
				<Col lg="3" md="6" sm="12">
					<Link to={{ pathname: pathname, state: { data: data } }}>
						{/* <span className="simplecard-see-more"> See more</span>{" "} */}

						<Card 
                        style={{"marginTop":"15px"}}>
							<div className="simplecard-img-container rounded">
								<AiOutlineFileImage />
							</div>
							<div className="simplecard-name">
								<Card.Title>{data.userName}</Card.Title>
							</div>
							<Card.Body className="simplecard-description">
								<div className="simplecard-username-container">
									<Avatar
										className="simplecard-avatar"
										icon={<UserOutlined />}
									/>
									{/* <span>{data.owner.userName}</span> */}
								</div>
								<p>{data.description}</p>
								<div className="simplecard-info-container">
									<div className="simplecard-info-left">
										<div className="simplecard-icon">
											<AiOutlineTeam />
											<span>{data.connections.length}</span>
										</div>
										<div className="simplecard-icon">
											<AiOutlineUserAdd />
										</div>
									</div>
									{isAdmin && (
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
						</Card>
					</Link>
				</Col>
			);
}

export default PeopleCard;