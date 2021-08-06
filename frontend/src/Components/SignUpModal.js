import React, {Component} from 'react'
import { Modal, Row, Col, Container, Button, Form } from "react-bootstrap";
import AuthService from "../services/auth.services";



export default class SignUpModal extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);


    // state for signup component
    this.state = {
     
      emailId: "",
      password: "",
      userName:"",
      firstName:"",
      lastName:"",
      phoneNo:"",
      successful: false,
      message: ""
    };
  }

 
  // handles user signup
  
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    // method to check validation functions

    
    // verifies if form validation is successful or not
   // if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.firstName,
        this.state.lastName,
        this.state.userName,
        this.state.emailId,
        this.state.password,
        this.state.phoneNo
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.response.message;

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
   // }
  }

  render() {
    
        return(
         
                <Container>
                  <Row>
                    <Form onSubmit= {this.handleRegister}>
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" onChange={(e)=>{this.setState({firstName:e.target.value})}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" onChange={(e)=> {this.setState({lastName:e.target.value})}} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUserName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter UserName" onChange={(e)=> {this.setState({userName:e.target.value})}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPhoneNumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Phone Number" onChange={(e)=> {this.setState({phoneNo:e.target.value})}}/>
                        </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=> {this.setState({emailId:e.target.value})}}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=> {this.setState({password:e.target.value})}}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicControlPassword">
                        <Form.Label>Confirm-Password</Form.Label>
                        <Form.Control type="confirm-password" placeholder="Password" onChange={(e)=> {this.setState({confirmPassword:e.target.value})}}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Row>
                  {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
                </Container>
         
        )
    
}

}