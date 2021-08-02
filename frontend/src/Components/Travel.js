import React, {Component} from "react";
import { Container, Row, Image, Carousel, Col } from "react-bootstrap";

class Travel extends Component{
    render(){
        return(
            <Container>
                <Row>
                    <Col style={{ width:"100%",height:"500px"}}>
                        <Image src="map.jpeg" style={{ width:"auto",height:"400px"}}/>
                    </Col>
                    <Col style={{height:"500px"}}>
                        <p>Whatever is clicked, we show info on that over here</p>
                    </Col>
                </Row>
                <Row>
                    <h2>Famous places</h2>
                </Row>
                <Row>
                    <Col>
                        <Carousel>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="img1.jpeg"
                              alt="First slide"
                            />
                            
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="img2.png"
                              alt="Second slide"
                            />

                            
                          </Carousel.Item>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="img3.jpeg"
                              alt="Third slide"
                            />

                            
                          </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col>
                        <p>Some information about this place</p>
                    </Col>
                    <Col>
                        <p>Some more information </p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Travel;