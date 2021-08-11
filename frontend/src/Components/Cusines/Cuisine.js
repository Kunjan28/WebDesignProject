import React, { Component } from "react";
import { Container, Row, Image, Carousel, Col, Form, Dropdown, Card, Button, CardGroup, Header } from "react-bootstrap";
import "./Cusines.css";
//import img from './foodblog.jpg';


const DOCUMENU_API_KEY = "cff91f44c684a03c1b4d509c5085c946";
const SPOONACULAR_API_KEY = "35e286a7691b4428a225021312a7b9de";

class Cuisine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            recipes: []
        }
    }

    getRestaurantData = async (e) => {
        const api_call = await fetch(`https://api.documenu.com/v2/restaurants/search/geo?lat=${this.props.lat}&lon=${this.props.lon}&distance=9&cuisine=${this.props.cuisine}&key=${DOCUMENU_API_KEY}`);
        const result = await api_call.json();
        this.setState({ restaurants: result.data });
        console.log(this.state.restaurants);
    }

    getSpoonacularRecipes = async (e) => {
        const api_call = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${this.props.cuisine}&number=7&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`);
        const result = await api_call.json();
        this.setState({ recipes: result.results });
    }

    componentDidUpdate(prevProps) {
        if (this.props.cuisine !== prevProps.cuisine) {
            this.getRestaurantData();
            this.getSpoonacularRecipes();
        }
    }

    render(props) {
        return (
            <div className="Cusines">
                
                <Row className="rows">
                    <Col className="columns" md={6}>
                        {this.state.restaurants.map((res) => {
                            return <div className="restaurant">
                                
                                <Card style={{ width: '100%' }}>
                                    <Card.Body>
                                        <Card.Title>{res.restaurant_name}</Card.Title>
                                        <Card.Text>
                                            <p>Address: {res.address.formatted}</p>
                                            <p>Contact: {res.restaurant_phone}</p>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">
                                        <a class="btn btn-primary" href={res.restaurant_website} role="button" target="_blank">Visit website</a>
                                    </Card.Footer>
                                </Card>
                                <br></br>
                            </div>
                        })}
                        <br></br>
                    </Col>

                    <Col className="recipe" lg={6}>
                        {this.state.recipes.map((recipe) => {
                            return <div className="recipe"><Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="holder.js/100px180" src={recipe.image} />
                                <Card.Body>
                                    <Card.Title>{recipe.title}</Card.Title>
                                    <Card.Text>
                                        <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                                <br></br>
                            </div>
                        })}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Cuisine;
