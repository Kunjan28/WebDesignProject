import React, { Component } from "react";
import { Container, Row, Image, Carousel, Col } from "react-bootstrap";
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import Geocode from "react-geocode";
import Map from './Map'
import Place from './Place'
import img1 from './travelImg1.jfif';
import img2 from './travelImg2.png';
import img3 from './travelImg3.jfif';
Geocode.setApiKey('AIzaSyBJd54lkWdNgrJVYKp4Oqr2YUSkfScT5Rg');

Geocode.enableDebug();

class Travel extends Component {

  constructor(props) {

    super(props);
    this.state = {
      lat: 19.8967662,
      lng: -155.5827818

    }
  }
  //Write api to get places in this funnction
  handleSubmit = async (x, y) => {

    console.log("In asd", x);
    console.log("In asd", y);
  };

  onPinChange = (x, y) => {
    this.setState({
      lat: x,
      lng: y
    })
  }
  render() {

    return (
  
          <div>
            <Map handleFormSubmit={this.handleSubmit} />
           
          </div>
      
    )
  }
}

export default Travel;