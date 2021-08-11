import React, { Component } from "react";
import Geocode from "react-geocode";
import Map from './Map'
import Place from './Place'

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
  
          <div style={{ 'minHeight': '100vh' }}>
            <Map handleFormSubmit={this.handleSubmit} />
           
          </div>
      
    )
  }
}

export default Travel;