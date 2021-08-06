import React from 'react';
import {GoogleMap,InfoWindow,Marker,withGoogleMap,withScriptjs} from "react-google-maps"



class Map extends React.Component{

    constructor( props ){
        console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
		super( props );
		this.state = {
		
			mapPosition: {
				lat: 37.317250,
				lng: -121.909490
			},
			markerPosition: {
				lat: 37.317250,
				lng: -121.909490
			}
		}
	}
  
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = ( event ) => {

	};

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = ( event ) => {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
		let newLat = event.latLng.lat(),
		    newLng = event.latLng.lng();
            this.props.handleFormSubmit(event.latLng.lat(),event.latLng.lng()); 
		
	};

	/**
	 * When the user types an address in the search box
	 * @param place
	 */
	onPlaceSelected = ( place ) => {
		console.log( 'plc', place );
		const latValue = place.geometry.location.lat(),
		      lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};
    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
              props => (
                <GoogleMap 
                           defaultZoom={ 10 }
                           defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                >
                  {/* InfoWindow on top of marker */}
                  <InfoWindow
                    onClose={this.onInfoWindowClose}
                    position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
                  >
                    <div>
                      <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
                    </div>
                  </InfoWindow>
                  {/*Marker*/}
                  <Marker 
                          name={'Dolores park'}
                          draggable={true}
                          onDragEnd={ this.onMarkerDragEnd }
                          position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                  />
                  <Marker />
                </GoogleMap>
              )
            )
          );
        return (
            <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
            loadingElement={
                <div style={{ height: `100%` }} />
            }
            containerElement={
                <div style={{ height: 500 }} />
            }
            mapElement={
                <div style={{ height: `100%` }} />
            }
        />
        )
    }
}

export default Map;