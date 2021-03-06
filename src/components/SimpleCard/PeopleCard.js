import React, { useState, Component } from "react";
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
import TopDownIcon from "./TopDownIcon";
import { useAuthState } from "../../context";
// import reactDom from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
	
const PeopleCard = ({isAdmin, data, pathname, sortFunction, removeFunction})=>{
			
	const [ifTopped, setifTopped] = useState(data.topped);
	const [numFriends, setNumFriends] = useState(data.connections.length)
	const authContext = useAuthState();
	const userName = authContext.userName;
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
											<span>{numFriends}</span>
										</div>
										<div className="simplecard-icon" onClick={(e)=>{
											e.preventDefault();
											if (!data.connections.includes(userName)){
												data.connections.push(userName);	
												setNumFriends(numFriends +1)
											}
										}}>
											<AiOutlineUserAdd />
										</div>
									</div>
									{isAdmin && (
										<div className="simplecard-info-left">
											<div className="simplecard-icon-admin" onClick={(e)=>{
													e.preventDefault();
													data.topped = !data.topped;
													setifTopped(data.topped);
													sortFunction();
													
												}}>
												<TopDownIcon ifTopped = {ifTopped} ></TopDownIcon>
											</div>
											<div className="simplecard-icon-admin"
											onClick={(e)=>{
												e.preventDefault();
												removeFunction(data);
											}}
											>
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