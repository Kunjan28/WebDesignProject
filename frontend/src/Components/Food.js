import React, { Component } from "react";
import { Container, Row, Image, Carousel, carousel, Col, Form, Dropdown, Card, Button, CardGroup } from "react-bootstrap";
import Cuisine from "./Cusines/Cuisine";
import "./Food";


const SPOONACULAR_API_KEY = "28104b06b04e433a8d9847a50eff9c65";

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

  cuisineChange(e) {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ "selectValue": value })
  }

  render() {

    return (
      <Container style={{ 'minHeight': '100vh' }}>
        <Row className="dropdown" >
          <Carousel className="carouse" fade={true}>
            <Carousel.Item interval={2000} >
              <img
                className="d-block w-100 h-50 d-inline-block"
                src={process.env.PUBLIC_URL + '/car1.jpg'}
                alt="First slide"
              />
              <Carousel.Caption>
                <div className="closecc" >
                <h2 >Italian</h2>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
                <button className="btn btn-lg btn-primary" value="italian" onClick={(e) => this.cuisineChange(e)} >
                  Search Restaurants
                </button>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={2000} >
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + '/car2.jpg'}
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Mexican</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <button className="btn btn-lg btn-primary" value="mexican" onClick={(e) => this.cuisineChange(e)} >
                Search Restaurants
                </button>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={2000}>
              <a href="https://google.com/"></a>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + '/car3.jpg'}
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Korean</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <button className="btn btn-lg btn-primary" value="korean" onClick={(e) => this.cuisineChange(e)} >
                Search Restaurants
                </button>
              </Carousel.Caption>
            </Carousel.Item>


            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + '/car4.jpg'}
                alt="fourth slide"
              />
              <Carousel.Caption>
                <h3>Indian</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <button className="btn btn-lg btn-primary" value="indian" onClick={(e) => this.cuisineChange(e)} >
                Search Restaurants
                </button>

              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={2000}>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + '/car5.jpg'}
                alt="fifth slide"
              />
              <Carousel.Caption>
                <h3>American</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>

                <button className="btn btn-lg btn-primary" value="american" onClick={(e) => this.cuisineChange(e)} >
                Search Restaurants
                </button>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>

        <br></br>
        <Cuisine cuisine={this.state.selectValue} lat={this.state.latitude} lon={this.state.longitude} />

        <Row>
          <div className="Food_recipe">
            <Col className="columns">
              {this.state.recipes.map((recipe) => {
                return <div><Card className="Recipe_card" style={{ width: '100%' }} >
                  <Card.Img variant="top" src="holder.js/100px180" src={recipe.image} />
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>
                      {recipe.summary}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <a className="btn btn-primary" href={recipe.sourceUrl} role="button" target="_blank">Visit website</a>
                  </Card.Footer>
                </Card>
                  <br></br>
                </div>
              })}
            </Col>
          </div>
        </Row>
      </Container>
    )
  }
}

export default Food;