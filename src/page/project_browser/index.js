import React, { Component } from "react";

import "./style.css";
import SimpleCard from "../../components/SimpleCard/singleCard.js";
import CardGroup from 'react-bootstrap/CardGroup';
import { CardDeck } from "react-bootstrap";
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
<CardDeck>
  <Card>
    <Card.Body>
      <Card.Title>card title</Card.Title>
      <Card.Text>
		card body
      </Card.Text>
    </Card.Body>
  </Card>


  <Card>
    <Card.Body>
      <Card.Title>card title</Card.Title>
      <Card.Text>
		card body
      </Card.Text>
    </Card.Body>
  </Card>  
  
  
  <Card>
    <Card.Body>
      <Card.Title>card title</Card.Title>
      <Card.Text>
		card body
      </Card.Text>
    </Card.Body>
  </Card> 
  
</CardDeck>
<CardDeck>
  <Card>
    <Card.Body>
      <Card.Title>card title</Card.Title>
      <Card.Text>
		card body
      </Card.Text>
    </Card.Body>
  </Card>


  <Card>
    <Card.Body>
      <Card.Title>card title</Card.Title>
      <Card.Text>
		card body
      </Card.Text>
    </Card.Body>
  </Card>  
  
  
  <Card>
    <Card.Body>
      <Card.Title>card title</Card.Title>
      <Card.Text>
		card body
      </Card.Text>
    </Card.Body>
  </Card> 
  
</CardDeck>
</reactDom>
    );
  }
}
