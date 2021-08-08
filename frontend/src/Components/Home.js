import React, {Component} from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import BlogWithTag from "./BlogWithTag";
import BlogServices from '../services/blogs.services';


class Home extends Component{
    constructor(props){
        super(props)

        this.state={
            
            blogs: [],
            showBlogs: [],

            tagsList:['Sports','Food','Travel','Movies','Tech','Funny','Miscellaneous'],
            selectedTag:'none',
            currentUser: localStorage.getItem("user") !== null && localStorage.getItem("user") !== undefined
                    ? JSON.parse(localStorage.getItem("user")).userName
                    : ''
        }
    }

    componentDidMount(){
        BlogServices.getAllPosts().then(
            (response) => {
                console.log(response.posts)
                this.setState({blogs: response.posts, showBlogs: response.posts})
                console.log('mounted')
            }
        )
    }
    render(){
        console.log("render called")
        console.log(this.state)
        return(
            <Container>
                <Row>
                    <Col md={2}>
                        <Navbar>
                            <Nav className="flex-column">
                                {
                                    this.state.tagsList.map((tag)=>{
                                        const lnk = 'blog/'+tag;
                                        return <Nav.Link key={tag} 
                                        onClick={(e)=> {
                                            console.log(tag)
                                            this.setState((currentState) => ({
                                                showBlogs: currentState.blogs.filter( (c) => {
                                                    return c.tag === tag
                                                })
                                            }))
                                            this.setState({selectedTag:tag})
                                            console.log('state changed')
                                        }} >{tag}</Nav.Link>
                                    })
                                }
                            </Nav>
                        </Navbar>
                    </Col>
                    <Col md={7}>
                    {console.log(this.state.currentUser)}
                        {
                            this.state.blogs.length === 0
                            ? <div>Loading ...</div>
                            : <BlogWithTag tag={this.state.selectedTag} blogs={this.state.showBlogs} userName={this.state.currentUser}/>
                        }
                        
                    </Col>
                    <Col>
                        <div>
                            advertisements
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;