import React, {Component} from 'react';
import $ from 'jquery';
import LoginModal from './LoginModal';
import { Modal, Row, Col, Container, Button } from "react-bootstrap";
import SignUpModal from './SignUpModal';

class Auth extends Component{

    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
            loginShow: false,
            signUpShow: false
        }
    }

    render(){

        const sendRequest = () =>{
            const emailid = this.props.credentials.emailid
            const password = this.props.credentials.password
            const aa = {"emailid":emailid, "password": password}
            console.log(aa)
            //authentication
            $.post("http://localhost:3000/user/create", {"emailid":emailid, "password": password}, function(data, status){
                console.log(status)
                if(status === 'success'){
                    this.setState({isLogged:true})
                    // this.props.isLogged=true
                    console.log(this.props)
                    
                }
                else{
                    alert('Invalid Credentials')
                }
            }.bind(this))
        }

        return(
            <Container>
                <Button variant="primary" onClick={() => this.setState({loginShow: true})}>
                    Login
                </Button>

                <Button variant="primary" onClick={() => this.setState({signUpShow: true})}>
                    Sign Up
                </Button>

                  <LoginModal
                    credentials = {this.props.credentials}
                    show={this.state.loginShow}
                    onHide={() => this.setState({loginShow: false})}
                    sendRequest1 = {()=> {sendRequest()}}
                  />
                  <SignUpModal 
                    credentials={this.props.credentials}
                    show={this.state.signUpShow}
                    onHide={()=>this.setState({signUpShow: false})}
                    sendRequest1 = {()=> {sendRequest()}}
                  />

                
            </Container>
        )
    }
}

export default Auth;