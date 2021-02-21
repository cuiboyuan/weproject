import { CardDeck } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import React, { Component } from 'react'
import reactDom from 'react-dom'

export default class SimpleCard extends Component {


    render() {
        const {projectName, projectDiscription} = this.props;

        return (
        <reactDom>
            <Card>
                <Card.Title>
                    {projectName}
                </Card.Title>
                <Card.Body>
                    {projectDiscription}
                </Card.Body>
            </Card>
        </reactDom>
        )
    }
}
