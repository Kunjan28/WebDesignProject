import React, {Component} from 'react';
import {Route, HashRouter} from 'react-router-dom';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Travel from './Components/Travel/Travel';
import Food from './Components/Food';
import Blog from './Components/Blog';
import LoginModal from './Components/LoginModal';
import SignUpModal from './Components/SignUpModal';
import $ from 'jquery';
import Auth from './Components/Auth';
import TopNav from './Components/TopNav';


class App extends Component{
	constructor(props){
        super(props)

        this.state = {
            credentials: {
                "emailid":'',
                "password":'',
                "firstName":'',
                "lastName":'',
                "phoneNumber":''},
            isLogged: false,
            blogs: [],
            loginShow: false,
            signUpShow: false
        }

        
    }

	componentDidMount(){
        this.userAuth()
    }

	writeBlog = (details) => {
		var api = "" //api to post the blog
		//blog should have tags, post, email
	}

    userAuth = () =>{
        console.log(this.state)
        var api="http://localhost:3000/user/getAll"

        
        
        $.getJSON(api).then(function(data){
            this.setState({users: data})
            console.log(this.state)
        }.bind(this))
    }


	render(){
		return(
			<HashRouter>
				<TopNav/>
				<Route exact path ='/' component={Home}/>
				<Route path ='/home' component={ (props) => <Auth credentials= {this.state.credentials} isLogged={this.state.isLogged}/>} />
				<Route path ='/travel' component={Travel} />
				<Route path ='/food' component={Food} />
				<Route path ='/blog' component={ (props) => <Blog credentials= {this.state.credentials} blogs={this.state.blogs} writeBlog = {(details)=>this.writeBlog(details)}/>} />				
				<Route  exact path="/login" component={LoginModal} />
                <Route  path="/signup" component={SignUpModal} />         
          
			</HashRouter>
		)
	}
}

export default App;
