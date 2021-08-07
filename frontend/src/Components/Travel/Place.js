import React from 'react';


class Place extends React.Component {

    constructor( props ){
        super( props );
        this.state = {
            lat: this.props.lat,
            lng: this.props.lng     
          }
    }

    componentDidMount() {
        console.log('in componentDidMount')
        this.state = {
            lat: this.props.lat,
            lng: this.props.lng     
          }
        this.fetchPlaces();
      }
   
    componentDidUpdate(prevProps){
        if(prevProps.lng !== this.props.lng){
            this.state = {
                lat: this.props.lat,
                lng: this.props.lng     
              }
        }
    }
      
   
      fetchPlaces() {
    
        const weatherURL=  `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.lat},${this.props.lng}&radius=1500&type=point_of_interest=&key=AIzaSyC5FmYAUnhQ6QJcswd2SkFZmWmfRqcjnqc`
        
     
        fetch(weatherURL)
        
            .then(res => res.json())
            .then(data => {
             console.log(data)
            }).catch(e =>console.log('City name not found'));
      }
      
   
    


    render(){

       

        return(
                <div>
                 {this.state.lat}

                </div>

        )

    }


}

export default Place;