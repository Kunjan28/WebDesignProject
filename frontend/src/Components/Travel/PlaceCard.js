import React from "react";
import defaultImage from './travelPlace.jfif';
import { Container,Button, Row, Image, Carousel, Col, Card,ListGroupItem,ListGroup } from "react-bootstrap";
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

        // <div>
        //     <Card>
        //       <Card.Img variant="top" src={getImage(placeDetails.photos)} />
        //       <Card.Body>
        //         <Card.Title>{placeDetails.name}</Card.Title>
        //         <Card.Text>
        //           Ratings:{placeDetails.rating} &nbsp;&nbsp;
        //           User Ratings:{placeDetails.user_ratings_total}&nbsp;&nbsp;
        //           Vicinity:{placeDetails.vicinity}
        //         </Card.Text>
        //       </Card.Body>
        //     </Card>
        // </div>
      


      //   <Card style={{ maxWidth: '600px' }}>
      //   <Card.Img variant="top" src={getImage(placeDetails.photos)} />
      //   <Card.Body>
      //     <Card.Title>{placeDetails.name}</Card.Title>
      //     <Card.Text>
      //     Ratings:{placeDetails.rating} &nbsp;&nbsp;
      //     User Ratings:{placeDetails.user_ratings_total}&nbsp;&nbsp;
      //     Vicinity:{placeDetails.vicinity}
      //     </Card.Text>
      //     <Button variant="primary">Explore</Button>
      //   </Card.Body>
      // </Card>

          <MDBRow>
          <MDBCol  xs={10} md={5} lg={5}>
            <MDBCard   alignment='center' shadow='0' border='dark' background='white' >
              <MDBCardImage
                src={getImage(placeDetails.photos)}
                alt='...'
                position='top'
                style={{ maxHeight: '200px' }}
              />
              <MDBCardBody>
                <MDBCardTitle>{placeDetails.name}</MDBCardTitle>
                <MDBCardText>
                Ratings:{placeDetails.rating} &nbsp;&nbsp;
          User Ratings:{placeDetails.user_ratings_total}&nbsp;&nbsp;
          Vicinity:{placeDetails.vicinity}
                </MDBCardText>
                <Button variant="primary">Explore</Button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

        </MDBRow>


      )
  );
}

export default PlaceCard;