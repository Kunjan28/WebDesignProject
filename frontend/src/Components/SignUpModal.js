import React, { Component } from 'react'
import { Modal, Row, Col, Container, Button, Form } from "react-bootstrap";
import AuthService from "../services/auth.services";

import "./form.css"

export default class SignUpModal extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);


    // state for signup component
    this.state = {

      emailId: "",
      password: "",
      userName: "",
      firstName: "",
      lastName: "",
      phoneNo: "",
      successful: false,
      message: "",
      password2: "",


      firstNameError: "",
      userNameError: "",
      lastNameError: "",
      phoneNoError: "",
      emailIdError: "",
      passwordError: "",
      password2Error: "",
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


  handleChange(e) {

    e.preventDefault();
    const { name, value } = e.target;
    let password = this.state.password;
    let email = this.state.emailId;
    const isValid = this.validate(name, value, email, password);
  };

  validate(name, value, email, password) {
    let firstNameError = "";
    let lastNameError = "";
    let userNameError = "";
    let phoneNoError = "";
    let emailIdError = "";
    let passwordError = "";
    let password2Error = "";
    var regExPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    var emailRegex = /([\w\.]+)@([\w\.]+)\.(\w+)/;
    var passwordRegex = /^[A-Za-z]\w{7,14}$/;

    switch (name) {
      case "first_name":
        this.setState({ "firstName": value });
        if (value.length <= 0) {
          firstNameError = 'Invalid Name'
          this.setState({ firstNameError });
        }
        else {
          firstNameError = ''
          this.setState({ firstNameError });
        }
        break;
      case "last_name":
        this.setState({ "lastName": value });
        if (value.length <= 0) {
          lastNameError = 'Invalid Name'
          this.setState({ lastNameError });
        }
        else {
          lastNameError = ''
          this.setState({ lastNameError });
        }
        break;
      case "user_name":
        this.setState({ "userName": value });
        if (value.length <= 0) {
          userNameError = 'Invalid Name'
          this.setState({ userNameError });
        }
        else {
          userNameError = ''
          this.setState({ userNameError });
        }
        break;
      case "email":
        this.setState({ "emailId": value });
        if (emailRegex.test(value)) {
          emailIdError = ''
          this.setState({ emailIdError });
        } else {
          emailIdError = 'Invalid Email'
          this.setState({ emailIdError });
        }
        break;

      case "phone_num":
        this.setState({ "phoneNo": value });
        if (regExPhone.test(value)) {
          phoneNoError = ""
          this.setState({ phoneNoError });
        } else {
          phoneNoError = "Wrong phone number"
          this.setState({ phoneNoError });
        }
        break;

      case "password":
        this.setState({ "password": value });
        if (passwordRegex.test(value)) {
          passwordError = ""
          this.setState({ passwordError });

        } else {
          passwordError = "Input Password and Submit [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter]"
          this.setState({ passwordError });

        }
        break;
      case "password2":
        this.setState({ "password2": value });
        if (value.length > 0 && value !== password) {
          password2Error = "Passwords don't match"
          this.setState({ password2Error });
        } else {
          password2Error = ""
          this.setState({ password2Error });
        }
        break;
      default:
        break;
    }

  }

  render() {
    return (
      <Container id="container">
        <Row>
          <div className="text-center pt-3">
            Join Us!!
          </div>
          <div className="text-center pt-3">
            Note : Fields marked with an asterisk(*) are mandatory
          </div>
          <Form className="login-form" onSubmit={this.handleRegister}>

            <Form.Group className="mb-3" controlId="formFirstName">
              <div className="form_1">
                <input type="text" autoComplete="off" required name="first_name" value={this.state.firstName} onChange={(e) => this.handleChange(e)} />
                <label htmlFor="name" className="label-name">
                  <span className="content-name">First Name* </span>
                </label>
              </div>
              <div style={{ fontSize: 15, color: "red" }}> {this.state.firstNameError}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <div className="form_1">
                <input type="text" autoComplete="off" required name="last_name" value={this.state.lastName} onChange={(e) => this.handleChange(e)} />
                <label htmlFor="name" className="label-name">
                  <span className="content-name">Last Name* </span>
                </label>
              </div>
              <div style={{ fontSize: 15, color: "red" }}> {this.state.lastNameError}</div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUserName">

              <div className="form_1">
                <input type="text" autoComplete="off" required name="user_name" value={this.state.userName} onChange={(e) => this.handleChange(e)} />
                <label htmlFor="name" className="label-name">
                  <span className="content-name">User Name* </span>
                </label>
              </div>

              <div style={{ fontSize: 15, color: "red" }}> {this.state.userNameError}</div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">

              <div className="form_1">
                <input type="text" autoComplete="off" required name="phone_num" value={this.state.phoneNo} onChange={(e) => this.handleChange(e)} />
                <label htmlFor="name" className="label-name">
                  <span className="content-name">Enter Phone number* </span>
                </label>
              </div>
              <div style={{ fontSize: 15, color: "red" }}> {this.state.phoneNoError}</div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="form_1">
                <input type="text" autoComplete="off" required name="email" value={this.state.emailId} onChange={(e) => this.handleChange(e)} />
                <label htmlFor="name" className="label-name">
                  <span className="content-name">Enter Email Id* </span>
                </label>
              </div>
              <div style={{ fontSize: 15, color: "red" }}> {this.state.emailIdError}</div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div className="form_1">
                <input type="text" autoComplete="off" required name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                <label htmlFor="name" className="label-name">
                  <span className="content-name">Enter Password* </span>
                </label>
                <div style={{ fontSize: 15, color: "red" }}> {this.state.passwordError}</div>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicControlPassword">
              <div className="form_1">
                <input type="text" autoComplete="off" required name="password2" value={this.state.password2} onChange={(e) => this.handleChange(e)} />
                <label htmlFor="name" className="label-name">
                  <span className="content-name">Confirm Password* </span>
                </label>
              </div>
              <div style={{ fontSize: 15, color: "red" }}> {this.state.password2Error}</div>

            </Form.Group>
            <div className="text-center">
              <Button className="btn-md btn-dark btn-block " type="submit">
                Submit
              </Button>&nbsp;&nbsp;
            </div>
            <div className="text-center pt-3">
              Already have an account?
            </div>
            <div className="text-center">
              <a href="/Login">Login</a>
            </div>
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