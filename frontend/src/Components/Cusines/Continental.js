import React, {Component} from "react";
import { Col, Row } from "react-bootstrap";

class Continental extends Component{
    render(){
        return(
            <Row>
                <Col>
                    Image
                </Col>

                <Col>
                    Address and description in cards
                </Col>

                <Col>
                    Reviews
                </Col>
            </Row>
        )
    }
}

export default Continental;