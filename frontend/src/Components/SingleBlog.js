import React, { Component } from "react"
import { Card, ListGroup, Button, Form } from 'react-bootstrap'
import TopNav from "./TopNav"
import BlogServices from '../services/blogs.services';

class SingleBlog extends Component{
    render(){
        const post = this.props.blog
        console.log(post.content)
        return(
            <div>
            <Card key = {post._id} style={{ width: '100%' }}>
                              <Card.Body>
                              <Card.Title className="text-center">{post.title}<Card.Subtitle className="mb-2 text-muted text-end">{post.tag}</Card.Subtitle></Card.Title>
                                <Card.Text>
                                  {post.content}
                                </Card.Text>
                                <Button className='btn-sm'
                                onClick={
                                    (e) => {
                                        this.setState( (currentState) => ({
                                            blogs: currentState.blogs.map( (c) =>{
                                                if(c.title === post.title) {
                                                    if(c.commentVisibility === 'block') {
                                                        c.commentVisibility='none'
                                                        c.buttonText='See Comments'
                                                    }
                                                    else {
                                                        c.commentVisibility='block'
                                                        c.buttonText='Hide Comments'
                                                    }
                                                }
                                                return c
                                            })
                                        }))
                                    }
                                }>{post.buttonText}</Button>
                                
                                <ListGroup variant="flush" style={{display:post.commentVisibility}}>
                                {
                                        post.comments.length === 0
                                        ? <div>No comments</div>
                                        : post.comments.map((comment) => {
                                            return <ListGroup.Item key ={comment.comment}>
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Subtitle>
                                                            {comment.userName}
                                                        </Card.Subtitle>
                                                        <Card.Text>
                                                            {comment.comment}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </ListGroup.Item>
                                        })
                                    }
                                        <Form className='form-tag'>
                                            <Form.Group className="mb-3" controlId="formFirstName">
                                                <Form.Control 
                                                type="text" 
                                                placeholder="Write a comment"
                                                value={post.currentComment}
                                                onChange={(e)=>{
                                                    this.setState( (currentState) => ({
                                                        blogs: currentState.blogs.map((c) =>{
                                                            if(c._id === post._id) {
                                                                c.currentComment=e.target.value
                                                            }
                                                            return c
                                                        })
                                                    }))
                                                }} />
                                            </Form.Group>
                                            <Button
                                            className='btn-sm'
                                            onClick = {(e)=>{
                                               // console.log(post.currentComment)
                                                BlogServices.addPostComment(post._id, this.props.userName,post.currentComment).then( () =>{
                                                    // window.location.reload();
                                                },error =>{
                                                    console.log('error commenr')
                                                })
                                                this.setState((currentState) => ({
                                                    blogs: currentState.blogs.map((c) =>{
                                                        if(c._id === post._id) {
                                                            c.comments = c.comments.concat([{userName:c.userName, comment:c.currentComment}])
                                                            console.log(c.comments)
                                                            c.currentComment=''
                                                        }
                                                        return c
                                                    })
                                                }))
                                            }}
                                            > Reply</Button>
                                        </Form>
                                    
                                </ListGroup>
                              </Card.Body>
                            </Card>
                        </div>
        )
    }
}

export default SingleBlog
