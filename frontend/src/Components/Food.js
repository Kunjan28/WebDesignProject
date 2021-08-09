import React, { Component } from "react";
import { Container, Row, Image, Carousel, Col, Form, Dropdown, Card, Button, CardGroup } from "react-bootstrap";
import Cuisine from "./Cusines/Cuisine";

class Food extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
      latitude: null,
      longitude: null
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
  }

  handleDropdownChange = (e) => {
    this.setState({ selectValue: e });
  }

  success(pos) {
    this.setState({latitude: pos.coords.latitude});
    this.setState({longitude: pos.coords.longitude});
  }

  error(err) {
    this.setState({latitude: "42.360081"});
    this.setState({longitude: "-71.058884"});
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(this.success, this.error);
  }

  render() {

    return (
      <Container>
        <Row>
          <Dropdown className="d-flex justify-content-center" onSelect={this.handleDropdownChange}>
            <Dropdown.Toggle variant="success" id="dropdown-basic" >
              Select Cuisine
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="continental">Continental</Dropdown.Item>
              <Dropdown.Item eventKey="italian">Italian</Dropdown.Item>
              <Dropdown.Item eventKey="mexican">Mexican</Dropdown.Item>
              <Dropdown.Item eventKey="vegan">Vegan</Dropdown.Item>
              <Dropdown.Item eventKey="indian">Indian</Dropdown.Item>
              <Dropdown.Item eventKey="korean">Korean</Dropdown.Item>
              <Dropdown.Item eventKey="american">American</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>

        <br></br>
        <Cuisine cuisine={this.state.selectValue} lat={this.state.latitude} lon={this.state.longitude}/>
      </Container>

    )
  }
}

export default Food;