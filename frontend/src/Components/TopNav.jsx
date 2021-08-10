import React from 'react';

import { Container, Nav, Navbar, Form , NavDropdown, FormControl, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import AuthService from "../services/auth.services";

const logout = () => {
  AuthService.logout();
  window.location.replace("/");
}




const TopNav = () => {
  return (
    <Navbar bg="light" expand="lg">
        <Container>
        {!localStorage.getItem('user') ?
          <Navbar.Brand href='/'>Welcome Guest!</Navbar.Brand> :
          <Navbar.Brand href='/'>Welcome {JSON.parse(localStorage.getItem("user")).firstName}!</Navbar.Brand>}
      
					{/* <Navbar.Brand href="#">Some Title</Navbar.Brand> */}
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
					  <Nav
					    className="mr-auto my-2 my-lg-0"
					    style={{ maxHeight: '100px' }}
					    navbarScroll
					  >
					    <Nav.Link href="#home">Home</Nav.Link>
					    <Nav.Link href="#travel">Travel</Nav.Link>
						<Nav.Link href="#food">Food</Nav.Link>
						{
							localStorage.getItem('user') === null
							? <Nav.Link href="#blog" disabled>Blog</Nav.Link>
							: <Nav.Link href="#blog">Blog</Nav.Link>
						}
                        {!localStorage.getItem('user') ?
              <Nav.Link to="/signup" activeClassName='active' as={NavLink} className="button_sign"><li>
                Sign Up
                </li></Nav.Link> : null}
            {!localStorage.getItem('user') ?
              <Nav.Link to="/login" activeClassName='active' as={NavLink} className="button_sign"><li>
                Login
                </li></Nav.Link> :
              <Nav.Link to="/" onClick={logout} activeClassName='active' as={NavLink} className="button_sign"><li>
                Logout
                </li></Nav.Link>}

					  </Nav>
					  <Form className="d-flex">
					    <FormControl
					      type="search"
					      placeholder="Search"
					      className="mr-2"
					      aria-label="Search"
					    />
					    <Button variant="outline-success">Search</Button>
					  </Form>
					</Navbar.Collapse>
                    </Container>
				</Navbar>
  );
};


export default (TopNav);
