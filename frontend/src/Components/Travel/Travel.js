import React, {Component} from "react";
import { Container, Row, Image, Carousel, Col } from "react-bootstrap";
import {GoogleMap,InfoWindow,Marker,withGoogleMap,withScriptjs} from "react-google-maps"
import Geocode from "react-geocode";
import Map from './Map'
import Place from './Place'
Geocode.setApiKey( 'AIzaSyBJd54lkWdNgrJVYKp4Oqr2YUSkfScT5Rg' );

Geocode.enableDebug();

class Travel extends Component{

  constructor( props ){
    
super( props );
this.state = {
    lat: 37.317250,
    lng: -121.909490

}
}
  //Write api to get places in this funnction
  handleSubmit = async (x,y) => {
    
    console.log("In asd",x);
    console.log("In asd",y);
};

onPinChange=(x,y)=>{
  this.setState({
    lat:x,
    lng:y
   })
}
    render(){
      
        return(
          
            <Container>
              <Row>
            <Map handleFormSubmit={this.handleSubmit} />
              </Row>
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