import React, { Component } from "react";

import "./style.css";
// import SimpleCard from "../../components/SimpleCard/SimpleCard.js";
// import CardGroup from 'react-bootstrap/CardGroup';
// import { CardDeck, Col, Container, Row } from "react-bootstrap";
// import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import reactDom from "react-dom";
import SimpleList from "../../components/SimpleList/SimpleList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../components/layout";
export default class TeammateBrowser extends Component {
  state = {
    inputForm: "",
    projects: [],
  };

  render() {
    const data = [
      {
        uid: 1,
        peopleName: "p 1",
        peopleDiscription: "people1 self intro",
      },
      {
        uid: 2,
        peopleName: "p 2",
        peopleDiscription: "people2 self intro",
      },
	  {
		  uid:3,
		  peopleName:"p 3",
		  peopleDiscription:"people3 self intro",
	  }
    ];
    const numCol = 2;
    const isProject = false;
    const numItem = 3;
	console.log("browser index.js", data)

    return (
      // <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      // 	<a href="/project">to go project</a>
      // </div>

      <div>
        <Layout>
          <div className="teammate-brw-container">
            <SearchBar />
            <SimpleList
              pathname={"/teammates"}
              numCol={numCol}
              numItem={numItem}
              data={data}
              isProject={isProject}
            />
          </div>
        </Layout>
      </div>
    );
  }
}
