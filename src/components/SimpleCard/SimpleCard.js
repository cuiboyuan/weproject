import { CardDeck, Col } from "react-bootstrap";
import {Card, Button} from 'react-bootstrap';
import React, { Component } from 'react'
import reactDom from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
export default class SimpleCard extends Component {


    render() {
        const {data, isProject} = this.props;

        //in case there is no content
        if(Object.keys(data).length == 0){
            return (
                <Col className="col-md-offset-2"></Col>
            )
        }
        if(isProject){
            const {projectName, projectDiscription} = data;
            return (
                    <Col className="col-md-offset-2">
                    <Card>
                        <Card.Title>
                            {projectName}
                            
                             (the simple card! Project Name here)
                        </Card.Title>
                        <Card.Body>
                            {projectDiscription}
                            (project discription here)
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" size="sm" className="float-left">See more</Button>
                            <Button variant="primary" size="sm" className="float-right">Join the group</Button>
                        </Card.Footer>
                    </Card>
                    </Col>
                )
        }else{
            const {peopleName, selfIntro} = data;
            return(
                <Col className="col-md-offset-2">
                <Card>
                    <Card.Title>
                        {peopleName}
                        (your name here)
                    </Card.Title>
                    <Card.Body>
                        {selfIntro}
                        (description here)
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" className="float-left">See more</Button>
                        <Button variant="primary" className="float-right">Connect</Button>
                    </Card.Footer>
                </Card>
                </Col>
            )
        }

    }
}
