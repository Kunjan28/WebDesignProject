import React from 'react';
import PlaceCard from './PlaceCard';
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps"



class Map extends React.Component {

	constructor(props) {
		console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
		super(props);
		console.log(this.props);
		this.state = {

			mapPosition: {
				lat: 37.317250,
				lng: -121.909490
			},
			markerPosition: {
				lat: 37.317250,
				lng: -121.909490
			},
			placeData: []
		}
	}

	// To load initial data
	componentDidMount() {
		this.fetchDataBasedOnCordinates(this.state.mapPosition.lat, this.state.mapPosition.lng)
	}

	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = (event) => {

	};

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = (event) => {
		let newLat = event.latLng.lat(), newLng = event.latLng.lng();
		this.props.handleFormSubmit(event.latLng.lat(), event.latLng.lng());
		this.fetchDataBasedOnCordinates(newLat, newLng);
	};

	fetchDataBasedOnCordinates = (latValue, lngValue) => {
		const placeURL = this.getPlacesNearBySearchURL(latValue, lngValue);
		fetch(placeURL)
			.then(res => res.json())
			.then(data => data.results.filter(result => result.types.includes("point_of_interest")))
			.then(data => this.setState({ 
								placeData: data,
						 		mapPosition: {
									lat: latValue,
									lng: lngValue
								},
								markerPosition: {
									lat: latValue,
									lng: lngValue
								}
							}) 
			)
			.catch(e => console.log('There was an error fetching data'));
	}

	getPlacesNearBySearchURL = (lat, long) => {
		return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=point_of_interest=&key=AIzaSyC5FmYAUnhQ6QJcswd2SkFZmWmfRqcjnqc`;
	}

	render() {
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<GoogleMap
						defaultZoom={10}
						defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
					>
						{/* InfoWindow on top of marker */}
						{/* <InfoWindow
                    onClose={this.onInfoWindowClose}
                    position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
                  >
                    <div>
                      <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
                    </div>
                  </InfoWindow> */}
						{/*Marker*/}
						<Marker
							name={'Dolores park'}
							draggable={true}
							onDragEnd={this.onMarkerDragEnd}
							position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
						/>
						<Marker />
					</GoogleMap>
				)
			)
		);
		return (
			<div>
				<AsyncMap

					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBJd54lkWdNgrJVYKp4Oqr2YUSkfScT5Rg&libraries=places`}
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
				<div>
					
					{this.state.placeData.map(place => <PlaceCard placeDetails={place}></PlaceCard>)}
				</div>
			</div>
		)
	}
}

export default Map;