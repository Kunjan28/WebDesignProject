import React, {Component} from 'react'
import { Modal, Row, Col, Container, Button, Form } from "react-bootstrap";
import AuthService from "../services/auth.services";
export default class LoginModal extends Component{

  constructor(props) {
    super(props);
    console.log("InLogin Modal")
    this.handleLogin = this.handleLogin.bind(this);
    //this.onChangeUsername = this.onChangeUsername.bind(this);
   // this.onChangePassword = this.onChangePassword.bind(this);

    // state of login component
    this.state = {
      emailid: "",
      password: "",
      loading: false,
      message: ""
    };
  }
   //sets username
   
    
    handleLogin(e) {
      e.preventDefault();
  
      this.setState({
        message: "",
        loading: true
      });
  
      // method to check validation functions
      
  
      // verifies if form validation is successful or not
      //if (this.checkBtn.context._errors.length === 0) {
        AuthService.login(this.state.emailid, this.state.password).then(
          () => {
            
            // localStorage.setItem("userCat",fetch("http://localhost:8001/api/user/getPreferences?id="+JSON.parse(localStorage.getItem("user")).id).then((results) => { return results.json() })).then((results) => {return results;})
            this.props.history.push("/");
  
            window.location.reload();
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            this.setState({
              loading: false,
              message: resMessage
            });
          }
        );
      // } else {
      //   this.setState({
      //     loading: false
      //   });
      // }
  
  
      
    }
    render(){
        return(<>
      
            
                <Container>
                  <Row>
                    <Form onSubmit= {this.handleLogin}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=> {this.state.emailid=e.target.value}}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=> {this.state.password=e.target.value}}/>
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
          
            </>
        )
    }
    
}
