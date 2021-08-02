import React, {Component} from "react";
import { Container, Row, Image, Carousel, Col, Form,Button } from "react-bootstrap";
import { Route } from "react-router-dom";

class Blog extends Component{
    render(){

        var data = ''

        const formSubmit = (e) =>{
            e.preventDefault()
            this.props.writeBlog(data)
        }

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
                            <Form.Label>Write a blog</Form.Label>
                            <Form.Control as="textarea" rows={3}  onChange={(e)=> {data=e.target.value}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                </Row>
                <Row>
                    <Col>
                        <ul>
                            {
                                this.props.blogs.map( (blog) => (
                                    <li>{blog.tag}</li> 
                                    // Nav link here
                                ))
                            }
                        </ul>
                    </Col>
                    <Col>
                        <div>
                            {/* Route here */}
                        </div>
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