import React from "react";
import defaultImage from './travelPlace.jfif';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';


const PlaceCard = ({ placeDetails }) => {



  const getImage = (photos) => {
    if (photos === undefined)
      return defaultImage;

    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=960&photoreference=${photos[0].photo_reference}&key=AIzaSyBJd54lkWdNgrJVYKp4Oqr2YUSkfScT5Rg`;
  }

  const getStars = (stars) => {
    if (stars === undefined)
      return ''

    let s = '';
    for (let i = 1; i <= stars; i++) {
      s = s + '☆';

    }
    return s
  }

  return (

    //  
    (placeDetails === undefined)
      ? <div></div>
      :
      (
        <div class="col-md-4" style={{display:`flex`}}>
          <div class="card" style={{ maxWidth: `100%`,maxHeight:`500px`,minWidth:`100%`,minHeight:`500px`,padding:`1%` }}>
            <img class="card-img-top" src={getImage(placeDetails.photos)} style={{minHeight:`70%`,maxHeight:`70%` }}></img>
            <div class="card-body" style={{fontFamxily:`cursive`, fontVariant:`historical-forms`,fontWeight:`bolder`,backgroundColor:`white`, hover:{backgroundColor:`grey`}}}>
              <h5 class="card-title" style={{color:`00293c`,fontWeight:`bolder`}}>{placeDetails.name}</h5>
              <p class="card-text">Ratings:{getStars(placeDetails.rating)} &nbsp;&nbsp;
                User Ratings:{placeDetails.user_ratings_total}</p>
              <p class="card-text">Vicinity:{placeDetails.vicinity}</p>
            </div>
          </div>
        </div>
      )
  );
}

export default PlaceCard;