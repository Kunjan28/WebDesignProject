import React, { Component } from "react";
import { Container, Row, Image, Carousel, Col, Form, Dropdown, Card, Button, CardGroup } from "react-bootstrap";
import Cuisine from "./Cusines/Cuisine";

const SPOONACULAR_API_KEY = "adef6fa141fa432796e6d6a8aaa8d63b";

class Food extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectValue: "",
      recipes: [],
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
    this.setState({ latitude: pos.coords.latitude });
    this.setState({ longitude: pos.coords.longitude });
  }

  error(err) {
    this.setState({ latitude: "42.360081" });
    this.setState({ longitude: "-71.058884" });
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(this.success, this.error);
  }


  getSpoonacularRecipes = async (e) => {
    const api_call = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${this.props.cuisine}&number=10&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`);
    const result = await api_call.json();
    this.setState({ recipes: result.results });
  }

  render() {

    return (
      <Container>
        <Row className="dropdown" >
          <Dropdown className="d-flex justify-content-center" onSelect={this.handleDropdownChange}>
            <Dropdown.Toggle variant="dark" id="dropdown-basic"  >
              Select Cuisine
            </Dropdown.Toggle>

            <Dropdown.Menu >
              <Dropdown.Item eventKey="italian">Italian</Dropdown.Item>
              <Dropdown.Item eventKey="mexican">Mexican</Dropdown.Item>
              <Dropdown.Item eventKey="indian">Indian</Dropdown.Item>
              <Dropdown.Item eventKey="korean">Korean</Dropdown.Item>
              <Dropdown.Item eventKey="american">American</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br></br>
        </Row>

        <br></br>
        <Cuisine cuisine={this.state.selectValue} lat={this.state.latitude} lon={this.state.longitude} />

      </Container>

    )
  }
}

export default Food;