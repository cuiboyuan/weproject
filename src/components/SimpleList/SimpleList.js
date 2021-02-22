
import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import reactDom from 'react-dom'
import SimpleRow from './SimpleRow';

export default class SimpleList extends Component {
    render() {
        //ifProject is an indicator, whether it is used for people / project view
        const {numCol, numItem, data, ifProject} = this.props;
        if (numItem % numCol != 0){
            let i = 0;
            while(i < numItem % numCol){
                data.push("");
            }
        }

        return (
            <reactDom>
                <Container>
                    the simple list!
                    <SimpleRow />
                </Container>
            </reactDom>
        
            )
    }
}
