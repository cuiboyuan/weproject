import React, { Component, useState } from "react";
import { /*  CardDeck, */ Col, Card, Button } from "react-bootstrap";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import {
	AiOutlineFileImage,
	AiOutlineTeam,
	AiOutlineLike,
	AiOutlineDelete,
	AiOutlineToTop,
} from "react-icons/ai";
import { ConsoleSqlOutlined, UserOutlined } from "@ant-design/icons";
// credit: https://react-icons.github.io/react-icons/;

import "./style.css";
import TopDownIcon from "./TopDownIcon";
import { useAuthState } from "../../context";

// import reactDom from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

const ProjectCard = ({
	isAdmin,
	data,
	pathname,
	sortFunction,
	removeFunction,
}) => {
	const [ifTopped, setifTopped] = useState(data.topped);
	//TODO: modify it to userID
	const authContext = useAuthState();
	const userName = authContext.userName;
	const [userLikedNum, setuserLikedNum] = useState(data.userLiked?.length || 0);

	return (
		<Col lg="3" md="6" sm="12">
			<Link to={{ pathname: pathname, state: { data: data } }}>
				{/* <span className="simplecard-see-more"> See more</span>{" "} */}

				<Card style={{ marginTop: "15px" }}>
					<div className="simplecard-img-container rounded">
						<AiOutlineFileImage />
					</div>
					<div className="simplecard-name">
						<Card.Title>{data.name}</Card.Title>
					</div>
					<Card.Body className="simplecard-description">
						<div className="simplecard-username-container">
							<Avatar className="simplecard-avatar" icon={<UserOutlined />} />
							<span>{data.owner.userName}</span>
						</div>
						<p>{data.description}</p>
						<div className="simplecard-info-container">
							<div className="simplecard-info-left">
								<div className="simplecard-icon">
									<AiOutlineTeam />
									<span>{data?.userIds?.length || 0}</span>
								</div>
								<div
									className="simplecard-icon"
									onClick={e => {
										e.preventDefault();
										if (!data.userLiked.includes(userName)) {
											data.userLiked.push(userName);
											setuserLikedNum(data.userLiked.length);
										}
									}}
								>
									<AiOutlineLike /> <span>{userLikedNum}</span>
								</div>
							</div>
							{isAdmin && (
								<div className="simplecard-info-left">
									<div
										className="simplecard-icon-admin"
										onClick={e => {
											e.preventDefault();
											data.topped = !data.topped;
											setifTopped(data.topped);
											sortFunction();
										}}
									>
										<TopDownIcon ifTopped={ifTopped}></TopDownIcon>
									</div>
									<div
										className="simplecard-icon-admin"
										onClick={e => {
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
};

export default ProjectCard;
