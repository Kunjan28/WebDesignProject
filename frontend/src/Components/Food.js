import React, {Component} from "react";
import { Container, Row, Image, Carousel, Col, Form, Dropdown } from "react-bootstrap";
import { Route } from "react-router-dom";
import Continental from "./Cusines/Continental";
import Italian from "./Cusines/Italian";
import Vegan from "./Cusines/Vegan";

class Food extends Component{
    render(){
        return(
            <Container>
                <Row>
                <Dropdown className="d-flex justify-content-center">
                  <Dropdown.Toggle variant="success" id="dropdown-basic" >
                    Select Cuisine
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/food/continental">Continental</Dropdown.Item>
                    <Dropdown.Item href="#/food/italian">Italian</Dropdown.Item>
                    <Dropdown.Item href="#/food/vegan">Vegan</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </Row>
                <Row>
                    <Route path='/food/continental' component = {Continental} />
                    <Route path='/food/italian' component = {Italian} />
                    <Route path='/food/vegan' component = {Vegan} />
                </Row>
            </Container>
        )
    }
}

export default Food;