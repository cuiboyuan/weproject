import React, { useState, Component, useEffect } from "react";
import { /*  CardDeck, */ Col, Card, Button } from "react-bootstrap";
import { Avatar, notification } from "antd";
import { Link } from "react-router-dom";
import {
    AiOutlineFileImage,
    AiOutlineTeam,
    AiOutlineDelete,
    AiOutlineToTop,
    AiOutlineUserAdd,
} from "react-icons/ai";
import { UserOutlined } from "@ant-design/icons";
// credit: https://react-icons.github.io/react-icons/;

import "./style.css";
import TopDownIcon from "./TopDownIcon";
import { useAuthState, useUsersState } from "../../context";
import { useTopUser } from "../../actions/user_profile";
// import reactDom from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

const PeopleCard = ({
    isAdmin,
    data,
    pathname,
    sortFunction,
    removeFunction,
}) => {
    const [ifTopped, setifTopped] = useState(data.topped);
    const [numFriends, setNumFriends] = useState(data.connections.length);
    const authContext = useAuthState();
    const usersContext = useUsersState();
    const userName = authContext.userName;
    const isLoggedIn = authContext.isLoggedIn;
    const user = usersContext.users.find((u) => u.userName === data.userName);


    return (
        <Col lg="3" md="6" sm="12">
            <Link to={{ pathname: pathname, state: { data: data } }}>
                {/* <span className="simplecard-see-more"> See more</span>{" "} */}

                <Card style={{ marginTop: "15px" }}>
                    <Card.Body className="simplecard-description">
                        <div className="simplecard-username-container">
                            {user?.avatar?.url ? (
                                <Avatar size={70} src={user?.avatar.url} />
                            ) : (
                                <Avatar
                                    size={70}
                                    className="project-card-avatar"
                                    icon={
                                        <UserOutlined className="project-card-avatar-content" />
                                    }
                                />
                            )}
                            {/* <span>{data.owner.userName}</span> */}
                        </div>
                        <span className="project-card-name">
                            {data.userName}
                        </span>
                        <p>{data.description}</p>
                        <div className="simplecard-info-container">
                            <div className="simplecard-info-left">
                                <div className="simplecard-icon">
                                    <AiOutlineTeam />
                                    <span>{numFriends}</span>
                                </div>
                                <div
                                    className="simplecard-icon"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (
                                            !data.connections.includes(
                                                userName
                                            ) &&
                                            isLoggedIn
                                        ) {
                                            usersContext.addFriend(
                                                data.userName
                                            );

                                            console.log(
                                                "currently adding friends",
                                                data.userName,
                                                data.pending,
                                                data.connections,
                                                authContext.userName
                                            );
                                            // setNumFriends(numFriends +1)
                                        }
                                    }}
                                >
                                    <AiOutlineUserAdd />
                                </div>
                            </div>
                            {isAdmin && (
                                <div className="simplecard-info-left">
                                    <div
                                        className="simplecard-icon-admin"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // data.topped = !data.topped;
                                            // setifTopped(data.topped);
                                            // settopUserName(data.userName)
                                            usersContext.topUser(
                                                data.userName,
                                                setifTopped,
                                                sortFunction
                                            );
                                        }}
                                    >
                                        <TopDownIcon
                                            ifTopped={ifTopped}
                                        ></TopDownIcon>
                                    </div>
                                    <div
                                        className="simplecard-icon-admin"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // removeFunction(data);
                                            usersContext.deleteUserByName(
                                                data.userName
                                            );
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

export default PeopleCard;
