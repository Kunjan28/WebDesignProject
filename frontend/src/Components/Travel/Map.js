import React from 'react';
import PlaceCard from './PlaceCard';
import { Button, InputGroup, FormControl, Container } from "react-bootstrap";
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import travelImg from './136008.jpg';
import travelGif from './earth.gif';

class Map extends React.Component {

	constructor(props) {
		console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
		super(props);
		console.log(this.props);
		this.state = {

			mapPosition: {
				lat: 19.8967662,
				lng: -155.5827818
			},
			markerPosition: {
				lat: 19.8967662,
				lng: -155.5827818
			},
			placeData: [],
			search: "", clippedSearch: "Hawaii"
		}
		this.divmap=React.createRef()
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
		console.log(placeURL)
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
		return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=60000&type=point_of_interest=&key=AIzaSyC5FmYAUnhQ6QJcswd2SkFZmWmfRqcjnqc`;
	}

	onChange = (ev) => {
		this.setState({ search: ev.target.value })
		console.log('search' + this.state.search)
	}

	onSubmit = () => {
		this.setState({ clippedSearch: this.state.search })
		console.log('Csearch' + this.state.clippedSearch)
		this.fetchCoordinatesByPlace(this.state.search);
		if(this.divmap.current){
            this.divmap.current.scrollIntoView({ 
               behavior: "smooth", 
               block: "nearest"
            })
        }
	}

	fetchCoordinatesByPlace = (placeName) => {
		const placeGmapURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=AIzaSyC5FmYAUnhQ6QJcswd2SkFZmWmfRqcjnqc`;
		fetch(placeGmapURL)
			.then(res => res.json())
			//.then(data => console.log(data.results[0].geometry.location.lat))
			.then(data => {

				this.setState({
					// // ...this.state,
					mapPosition: {
						lat: Number.parseFloat(data.results[0].geometry.location.lat),
						lng: Number.parseFloat(data.results[0].geometry.location.lng)
					},
					markerPosition: {
						lat: Number.parseFloat(data.results[0].geometry.location.lat),
						lng: Number.parseFloat(data.results[0].geometry.location.lng)
					}
				})

				return {
					lat: Number.parseFloat(data.results[0].geometry.location.lat),
					lng: Number.parseFloat(data.results[0].geometry.location.lng)
				}

			}
				// .then(data => console.log(data))
			)
			.then(data => this.fetchDataBasedOnCordinates(data.lat, data.lng))
			.catch(e => console.log('Cannot find place'));

	}



	render() {
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<GoogleMap
						defaultZoom={10}
						defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}>

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


				{/* Image with Searchbar */}
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ backgroundImage: `url(${travelImg})`, backgroundSize:'cover', WebkitBackgroundSize:`cover`,MozBackgroundSize:`cover`,oBackgroundSize: `cover`,maxHeight: `600px`,minHeight: `600px`, minWidth:`100%`}}>

					<InputGroup style={{ maxWidth: `80%`, height:'25%', paddingTop:'7%', paddingLeft:'20%' }}>
						<FormControl
							placeholder="Enter place you want to visit and click Search"
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
							value={this.state.city}
							onInput={this.onChange}
						/>
						
						<Button style={{backgroundColor:`#04060F`}} size="lg"  variant="outline-primary" active onClick={this.onSubmit}>
							Search
						</Button>
					</InputGroup>

				</div>


				{/* Map with desc */}
				<div ref={this.divmap} style={{ backgroundImage: `url(${travelGif})`}} >
					<div className="row">

						<div class="col-md-5" style={{ margin: '1%' }} >
							<AsyncMap

								googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBJd54lkWdNgrJVYKp4Oqr2YUSkfScT5Rg&libraries=places`}
								loadingElement={
									<div style={{ height: `100%` }} />
								}
								containerElement={<div style={{ height: '500px' }} />
								}
								mapElement={
									<div style={{ height: `100%` }} />
								}
							/>
						</div>
						<div class="col-md-5">
							<p style={{ color: `white`, fontSize: '80px', fontFamily: `cursive`, textAlign: `center`, paddingTop: `80px` }}>
								Let's Explore {this.state.clippedSearch} :))
							</p>

						</div>


					</div>

				</div>


				{/* Map with desc */}
				<div class="card-group" style={{ marginLeft: 'auto', marginRight: 'auto', alignContent: 'center' }}>
					{this.state.placeData.map(place =>
						<PlaceCard placeDetails={place}></PlaceCard>
					)}
				</div>


			</div >
		)
	}
}

export default Map;