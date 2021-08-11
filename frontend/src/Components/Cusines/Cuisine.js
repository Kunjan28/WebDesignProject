import React, { Component } from "react";
import { Container, Row, Image, Carousel, Col, collapse, Form, Dropdown, Card, Button, CardGroup, Header } from "react-bootstrap";
import "./Cusines.css";
import ReactPaginate from "react-paginate";


const DOCUMENU_API_KEY = "cff91f44c684a03c1b4d509c5085c946";
const SPOONACULAR_API_KEY = "9644f3c958834411aa07e947c410b7b5";

class Cuisine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            recipes: [],
            pageNumber: 0,
            pageCount: 0,
            usersPerPage: 5,
            pagesVisited: 0
        }

        this.scrollRef = React.createRef()
    }


    getRestaurantData = async (e) => {
        const api_call = await fetch(`https://api.documenu.com/v2/restaurants/search/geo?lat=${this.props.lat}&lon=${this.props.lon}&distance=11&cuisine=${this.props.cuisine}&key=${DOCUMENU_API_KEY}`);
        const result = await api_call.json();
        let resPageCount = Math.ceil(result.data.length / this.state.usersPerPage);
        this.setState({ restaurants: result.data, pageCount: resPageCount });
    }

    getSpoonacularRecipes = async (e) => {
        const api_call = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${this.props.cuisine}&number=4&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`);
        const result = await api_call.json();
        this.setState({ recipes: result.results });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevState, this.state)
        if (prevState.pageNumber !== this.state.pageNumber) {
            let newPagesVisited = this.state.usersPerPage * this.state.pageNumber;
            console.log(newPagesVisited)
            this.setState({ pagesVisited: newPagesVisited });
        }
        if (this.props.cuisine !== prevProps.cuisine) {
            this.getRestaurantData();
            this.getSpoonacularRecipes();
        }
    }

    changePage = ({ selected }) => {
        // console.log(selected)
        this.setState({ "pageNumber": selected });
        this.scrollRef.current.scrollIntoView();
    }

    render(props) {
        return (
            <div className="Cusines">
                <Row ref={this.scrollRef} className="rows">
                    <Col className="columns" md={8}>
                        {this.state.restaurants.length > 0 ?
                            <h1>Nearby Restaurants</h1> :
                            <p></p>}
                        {this.state.restaurants
                            .slice(this.state.pagesVisited, (this.state.pagesVisited + this.state.usersPerPage))
                            .map((res, index) => {
                                return <div key={index} className="restaurant">
                                    <Card className="hello" style={{ width: '100%' }}>
                                        <div className="overflow" >
                                            <img src={process.env.PUBLIC_URL + '/img' + Math.floor(1 + Math.random() * 21) + '.jpg'} alt="" className="card-img-top" />
                                        </div>
                                        <Card.Body>
                                            <Card.Title>{res.restaurant_name}</Card.Title>
                                            <Card.Text>
                                                <p>Address: {res.address.formatted}</p>
                                                <p>Contact: {res.restaurant_phone}</p>
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="text-muted">
                                            <a className="btn btn-primary" href={res.restaurant_website} role="button" target="_blank">Visit website</a>
                                        </Card.Footer>
                                    </Card>
                                    <br></br>
                                </div>
                            })}
                        <br></br>

                        {this.state.restaurants.length > 0 ? <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={(Math.ceil((this.state.restaurants.length) / this.usersPerPage))}
                            pageCount={this.state.pageCount}
                            onPageChange={this.changePage}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBtn"}
                            nextLinkClassName={"nextBtn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        /> : ""}

                    </Col>

                    <Col className="columns" lg={4}>
                        {this.state.restaurants.length > 0 ?
                            <h1> Related Blogs</h1> :
                            <p></p>}
                        {this.state.recipes.map((recipe, index) => {
                            return <div key={index} className="recipe"><Card style={{ width: '100%' }}>
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