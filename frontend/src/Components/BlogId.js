import React, { Component } from "react";
import BlogServices from '../services/blogs.services';
import { Container } from "react-bootstrap";
import SingleBlog from "./SingleBlog";
import Loading from "./Loading";

class BlogId extends Component{
    constructor(props){
        super(props)
        
        this.state ={
            blog: undefined,
            id : this.props.match.params.id,
            loaded: false
        }
    }

    componentDidMount(){
        console.log('moun')
        BlogServices.getPostById(this.props.match.params.id).then(
            (response) => {
                console.log(response)
                const blog = response
                blog.commentVisibility='none'
                blog.buttonText = 'See Comments'
                blog.currentComment=''
                this.setState({blog:blog, loaded:true})
            }
        )
    }

    render(){
        console.log(this.state.id)
        return(
            <Container>
                {
                    this.state.loaded === false
                    ? <Loading />
                    : <SingleBlog blog = {this.state.blog}/>
                }
            </Container>
        )
    }
}

export default BlogId