import React, {Component} from "react";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Container, Row, Image, Carousel, Col, Form,Button, Dropdown } from "react-bootstrap";
import { HashRouter, Route } from "react-router-dom";
import BlogByUser from "./BlogByUser";
import BlogServices from '../services/blogs.services';

class Blog extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            rowLength:3,
            heading:'',
            content:'',
            postTag:'Select Tag',
            tagsList:['Sports','Food','Travel','Movies','Tech','Funny','Miscellaneous'],
            selectedTag:'none',
            userName: localStorage.getItem("user") !== null && localStorage.getItem("user") !== undefined
            ? JSON.parse(localStorage.getItem("user")).userName
            : ''
        }
    }

    render(){

        const formSubmit = (e) =>{
            e.preventDefault()
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            BlogServices.addPost(
                this.state.postTag,
                this.state.heading,
                this.state.content,
                today,
                this.state.userName
                ).then( ()=>{
                    window.location.reload();
                },
                error =>{
                    console.log('error.respons')
                })
            const blog={ //add user id
                tag:this.state.postTag,
                head:this.state.heading,
                content:this.state.content,
                
            }
            this.props.writeBlog(blog)
            this.setState({rowLength:3,heading:'Title of the post',content:'Write something here',postTag:'Select Tag',color:'grey'})

        }
        console.log(this.state)
        

        return(
            <Container>
                <Row >
                    <h2 className="d-flex justify-content-center">
                        Happy blogging
                    </h2>
                </Row>
                <Row>
                    <Form onSubmit={formSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Write something</Form.Label>
                            <Form.Control
                            as="textarea" rows={1} 
                            onClick={(e)=>{this.setState({heading:''})}}
                            placeholder='Title of the blog'
                            value={this.state.heading}
                            onChange={(e)=> {this.setState({heading:e.target.value})}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                            <Form.Control as="textarea" 
                            rows={this.state.rowLength}
                            placeholder='Content goes here'
                            value={this.state.content}
                            onClick={(e)=>{this.setState({rowLength:10, content:''})}} 
                            onChange={(e)=> {this.setState({content:e.target.value})}}/>
                        </Form.Group>
                        <Dropdown className="d-flex justify-content-end">
                          <Dropdown.Toggle variant="success" id="dropdown-basic" >
                            {this.state.postTag}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                              {this.state.tagsList.map((tag)=>(
                                  <Dropdown.Item onClick={(e)=>{this.setState({postTag:tag})}} key={tag}>{tag}</Dropdown.Item>
                              ))}
                          </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                </Row>
                <Row>
                    <Col md={2}>
                        <Navbar>
                            <Nav className="flex-column">
                                {
                                    this.state.tagsList.map((tag)=>{
                                        const lnk = 'blog/'+tag;
                                        return <Nav.Link key={tag} onClick={(e)=> this.setState({selectedTag:tag})} >{tag}</Nav.Link>
                                        
                                    })
                                }
                            </Nav>
                        </Navbar>
                    </Col>
                    <Col md={7}>
                        <BlogByUser userName={this.state.userName}/>
                    </Col>
                    <Col>
                        <div>
                            space for advertisements
                        </div>
                    </Col>

                </Row>
                
            </Container>
        )
    }
}

export default Blog;