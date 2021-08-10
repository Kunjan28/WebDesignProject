import React from 'react';

import { Container, Nav, Navbar, Form , FormControl, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import AuthService from "../services/auth.services";
import '../css/mainTheme.scss'

const logout = () => {
  AuthService.logout();
  window.location.replace("/");
}




const TopNav = () => {
  return (
    <Navbar className='navbar-main sticky-top' bg="light" expand="lg">
        {!localStorage.getItem('user') ?
          <Navbar.Brand className='navbar-title' href='/'>Welcome Guest!</Navbar.Brand> :
          <Navbar.Brand className='navbar-title' href='/'>Welcome {JSON.parse(localStorage.getItem("user")).firstName}!</Navbar.Brand>}
      
					{/* <Navbar.Brand href="#">Some Title</Navbar.Brand> */}
					<Navbar.Toggle aria-controls="navbar-Scroll" className="nav-toggle" />
					<Navbar.Collapse id="navbar-Scroll" >
					  <Nav
					    className="mr-auto my-2 my-lg-0 navbar-nav-part"
					    style={{ maxHeight: '100px' }}
					    navbarScroll
					  >
					    <Nav.Link activeClassName="active" className='navbar-text' href="#home">Home</Nav.Link>
					    <Nav.Link activeClassName="active" className='navbar-text' href="#travel">Travel</Nav.Link>
						<Nav.Link activeClassName="active" className='navbar-text' href="#food">Food</Nav.Link>
						{
							localStorage.getItem('user') === null
							? <Nav.Link activeClassName="active" className='navbar-text' href="#blog" disabled>My Blog</Nav.Link>
							: <Nav.Link activeClassName="active" className='navbar-text' href="#blog">My Blogs</Nav.Link>
						}
                        {!localStorage.getItem('user') ?
              <Nav.Link to="/signup" activeClassName='active' as={NavLink} className="button_sign navbar-text"><li>
                Sign Up
                </li></Nav.Link> : null}
            {!localStorage.getItem('user') ?
              <Nav.Link to="/login" activeClassName='active' as={NavLink} className="button_sign navbar-text"><li>
                Login
                </li></Nav.Link> :
              <Nav.Link to="/" onClick={logout} as={NavLink} className="button_sign navbar-text"><li>
                Logout
                </li></Nav.Link>}

					  </Nav>
					</Navbar.Collapse>
				</Navbar>
  );
};


export default (TopNav);
