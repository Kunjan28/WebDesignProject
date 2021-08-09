import React, { Component } from "react";
import { Container, Row, Image, Carousel, Col } from "react-bootstrap";
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import Geocode from "react-geocode";
import Map from './Map'
import Place from './Place'
Geocode.setApiKey('AIzaSyBJd54lkWdNgrJVYKp4Oqr2YUSkfScT5Rg');

Geocode.enableDebug();

class Travel extends Component {

  constructor(props) {

    super(props);
    this.state = {
      lat: 37.317250,
      lng: -121.909490

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
            <input type="text" style={{ marginLeft: 450, marginTop: 1 }} value={this.state.city} placeholder='Enter city' onInput={this.onChange} />
<button onClick={this.onSubmit}>Search</button>
          </div>
      
    )
  }
}

export default Travel;