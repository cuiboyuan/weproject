import React, { Component } from "react";
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
import { UserOutlined } from "@ant-design/icons";
// credit: https://react-icons.github.io/react-icons/;

import "./style.css";

// import reactDom from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";



const PeopleCard = (peopleName, peopleDiscription)=>{
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

export default PeopleCard;