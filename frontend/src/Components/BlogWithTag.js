import React, {Component} from 'react'
import { Card, ListGroup, Button, Form } from 'react-bootstrap'

class  BlogWithTag extends Component{

    constructor(props){
        super(props)
        // console.log(this.props.blogs)
        var addBlogs = this.props.blogs
        for(var blog of addBlogs){
            blog.commentVisibility='none'
            blog.buttonText = 'See Comments'
            blog.currentComment=''
        }
        this.state = {
            blogs: addBlogs,
            tag: this.props.tag
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.tag != this.props.tag){
            console.log(this.props.blogs)
            this.setState({blogs:this.props.blogs, tag: this.props.tag})
        }
    }

    render(){
        console.log(this.state)
        return(
            <div key={this.props.tag}>
                <h1>
                    {this.props.tag}
                </h1>
                {console.log(this.state.blogs)}
                {
                    this.state.blogs.map((post)=>{
                        console.log(post)
                        return(
                            <Card key = {post._id} style={{ width: '100%' }}>
                              <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Img variant="top" src={post.imagePath} />
                                <Card.Subtitle className="mb-2 text-muted">{post.tag}</Card.Subtitle>
                                <Card.Text>
                                  {post.content}
                                </Card.Text>
                                <Button onClick={
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
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formFirstName">
                                                <Form.Control 
                                                type="text" 
                                                placeholder="Write a comment"
                                                value={post.currentComment}
                                                onChange={(e)=>{
                                                    this.setState( (currentState) => ({
                                                        blogs: currentState.blogs.map((c) =>{
                                                            if(c.title === post.title) {
                                                                c.currentComment=e.target.value
                                                            }
                                                            return c
                                                        })
                                                    }))
                                                }} />
                                            </Form.Group>
                                            <Button
                                            onClick = {(e)=>{
                                                this.setState((currentState) => ({
                                                    blogs: currentState.blogs.map((c) =>{
                                                        if(c.title === post.title) {
                                                            c.comments = [{userName:'shjs', comment:c.currentComment}].concat(c.comments)
                                                            console.log(c.comments)
                                                            c.currentComment=''
                                                        }
                                                        return c
                                                    })
                                                }))
                                            }}
                                            > Reply</Button>
                                        </Form>
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
                                </ListGroup>
                              </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}

export default BlogWithTag