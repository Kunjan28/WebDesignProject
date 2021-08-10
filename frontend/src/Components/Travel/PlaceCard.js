import React from "react";
import defaultImage from './travelPlace.jfif';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';


const PlaceCard = ({ placeDetails }) => {



  const getImage = (photos) => {
    if (photos === undefined)
      return defaultImage;

    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=960&photoreference=${photos[0].photo_reference}&key=AIzaSyBJd54lkWdNgrJVYKp4Oqr2YUSkfScT5Rg`;
  }



  return (

    //  
    (placeDetails === undefined)
      ? <div><h4>Please select the day first on first page</h4></div>
      :
      (
        <div class="card-group" style={{paddingLeft:`0px`,display: `inline-block`,flexDirection: 'row'}}>
        <div class="card" style={{maxWidth:`500px`,flex: 1}}>
          <img class="card-img-top" style={{maxWidth:`500px`}} src={getImage(placeDetails.photos)}></img>
          <div class="card-body">
            <h5 class="card-title">{placeDetails.name}</h5>
            <p class="card-text"> Ratings:{placeDetails.rating} &nbsp;&nbsp;
                User Ratings:{placeDetails.user_ratings_total}</p>
            <p class="card-text">Vicinity:{placeDetails.vicinity}</p>
          </div>
        </div>
        
      </div>
        

        


      )
  );
}

export default PlaceCard;