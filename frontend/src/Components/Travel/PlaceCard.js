import React from "react";
import "./PlaceCard.css";
import { Button } from 'react-bootstrap';

const PlaceCard = ({ placeDetails }) => {


    const getImage = (photos) => {
        let imgUrl;
        console.log('in photoref')
        if (photos === undefined) return "Jaya"
        else {
            const photoApi = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=960&photoreference=${photos[0].photo_reference}&key=AIzaSyBJd54lkWdNgrJVYKp4Oqr2YUSkfScT5Rg`
            imgUrl = fetch(photoApi)
                .then(res => res.json())
                .catch(e => console.log(e + 'There was an error fetching data'));
        }
        console.log('000000')
        console.log(imgUrl)
        return imgUrl;
    }

    const getImage2 = (photos) => {
        if (photos === undefined) 
            return "Jaya"
    
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=960&photoreference=${photos[0].photo_reference}&key=AIzaSyBJd54lkWdNgrJVYKp4Oqr2YUSkfScT5Rg`;
    }




    return (

        //  
        (placeDetails === undefined)
            ? <div><h4>Please select the day first on first page</h4></div>
            :
            (
                <div className="card">

                    <div className="card-title-group">
                        <h5 className="card-title">{placeDetails.name}</h5>
                       
                    <img src={getImage2(placeDetails.photos)} />
                    <div className="card-rating">
                        Ratings:{placeDetails.rating} &nbsp;&nbsp;
                    User Ratings:{placeDetails.user_ratings_total}&nbsp;&nbsp;
                    Vicinity:{placeDetails.vicinity}</div>
                    
                    </div>

                   
                   
                </div>
             
            )
    );
}

export default PlaceCard;