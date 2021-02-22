import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import SimpleCard from '../SimpleCard/SimpleCard'

export default class extends Component {
    render() {
        // const {numCol, data, isProject} = this.props;
        // const numCol, data = [4, [{projectName: "csc309", projectDiscription: "interesting Project"}, {}, {}, {}]]

        const data = [{projectName: "csc309", projectDiscription: "interesting Project"}, {}, {}, {}]
        return(
        <div>
            simple row in the list 
            <Row className="top5">
            <SimpleCard data={data[0]} isProject={true}/>
            <SimpleCard data={data[0]} isProject={true}/>

            <SimpleCard data={data[0]} isProject={true}/>
            <SimpleCard data={data[0]} isProject={true}/>
            </Row>
        </div>
        )
    }
}
