import React, { Component } from "react";

import "./style.css";
import SimpleCard from "../../components/SimpleCard/singleCard.js";
import CardGroup from 'react-bootstrap/CardGroup';
import { CardDeck, Col, Container, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import reactDom from "react-dom";
export default class ProjectBrowser extends Component {
  render() {
    return (
      // <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      // 	<a href="/project">to go project</a>
      // </div>
<reactDom>
<Container>
  <Row className="top5">
    <Col><CardDeck>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This card has supporting text below as a natural lead-in to additional
        content.{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
</CardDeck></Col>
  </Row>
  <Row className="top5">
    <Col><Card><Card.Title>haha</Card.Title></Card></Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </Row>
</Container>
</reactDom>
    );
  }
}
