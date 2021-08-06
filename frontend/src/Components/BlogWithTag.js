import React, {Component} from 'react'
import { Card } from 'react-bootstrap'

class  BlogWithTag extends Component{

    constructor(props){
        super(props)
        this.state = {
            blogs:[
                {
                    head: 'blaba',
                    content:'gdjsgs',
                    tag:'Sports'
                },
                {
                    head: 'blaba13',
                    content:'gdjsgs',
                    tag:'Sports'
                },
                {
                    head: 'blaba43',
                    content:'gdjsgs',
                    tag:'Sports'
                },
                {
                    head: 'blaba254',
                    content:'gdjsgs',
                    tag:'Food'
                },
                {
                    head: 'blaba52453',
                    content:'gdjsgs',
                    tag:'Food'
                },
                {
                    head: 'blaba3365',
                    content:'gdjsgs',
                    tag:'Sports'
                }
            ]
        }
    }

    render(){

        return(
            <div>
                <h1>{this.props.tag ==='none'
                    ? ''
                    : this.props.tag
                }</h1>
                {
                    this.state.blogs.map((post)=>{
                        return(
                            <Card key = {post.head} style={{ width: '100%' }}>
                              <Card.Body>
                                <Card.Title>{post.head}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{post.tag}</Card.Subtitle>
                                <Card.Text>
                                  {post.content}
                                </Card.Text>
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