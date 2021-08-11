import React, {Component} from 'react'
import { Carousel,Container, Card, Col, Button, Row } from 'react-bootstrap'
import './blogsWrite.scss'

class RealHome extends Component{
    render(){
        return(
          <div style={{ 'minHeight': '100vh' }}>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 h-50"
                      src="images/foodn2.jpg"
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>Food</h3>
                      <p>Great Food</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="images/traveln7.jpg "
                      alt="Second slide"
                    />

                    <Carousel.Caption>
                      <h3>Travel</h3>
                      <p>Love to Travel</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="images/blogn1.jpg "
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>Blog</h3>
                      <p>Passionate Blogger</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
                <Container>
                <Row>
                    <Col xs={12} lg={4}>
                        <Card className="home-cards">
                          <Card.Img variant="top" src="images/foodCard.png" />
                          <Card.Body>
                            <Card.Title>Food blogging represents a complex interweaving of “foodie” or gourmet interest in cooking with those of blog writing and photography. The majority of blogs use pictures taken by the author himself/herself and some of them focus specifically on food photography.</Card.Title>
                            <Button className="btn-go-to" variant="primary" href="#food">Go to Food</Button>
                          </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} lg={4}>
                    <Card className="home-cards" >
                          <Card.Img variant="top" src="images/travelCardn4.jpg" />
                          <Card.Body>
                            <Card.Title>A travel blogger, also known as travel writer or just as “blogger”, is someone who travels around the world collecting material for writing about their travel experiences, deriving income from a variety of on-line and off-line sources. Every place is worth exploring.</Card.Title>
                            
                            <Button className="btn-go-to" variant="primary" href="#travel">Go to Travel</Button>
                          </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} lg={4}>
                    <Card className="home-cards" >
                          <Card.Img variant="top" src="images/blogCardn3.jpg" />
                          <Card.Body>
                            <Card.Title>When you are choosing your passion blog topic, think carefully about how you might sustain this blog over several weeks. How will you introduce new topics? How will you interest and inform your readers? How will you invite readers to comment? What is
                                the function of this blog?</Card.Title>
                            
                            <Button className="btn-go-to" variant="primary" href="#blog">Go to Blogging</Button>
                          </Card.Body>
                        </Card>
                    </Col>
                </Row>
                </Container>
            </div>
        )
    }
}

export default RealHome