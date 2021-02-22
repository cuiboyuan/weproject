import React, { Component } from "react";

import "./style.css";
import SimpleCard from "../../components/SimpleCard/SimpleCard.js";
import CardGroup from 'react-bootstrap/CardGroup';
import { CardDeck, Col, Container, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import reactDom from "react-dom";
import SimpleList from "../../components/SimpleList/SimpleList";
import SearchBar from "../../components/SearchBar/SearchBar";
export default class ProjectBrowser extends Component {
	state={
		inputForm: "",
		projects:[]
	}



  render() {
    return (
      // <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      // 	<a href="/project">to go project</a>
      // </div>
		<div>
			<SearchBar />
		<SimpleList />
		</div>
    );
  }
}
