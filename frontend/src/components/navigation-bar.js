import React, {Component} from 'react';
import {Navbar, Nav, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="light" variant="light">
                <Container>
                    <Link className="navbar-brand" to={""}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png" width="25"
                             height="25" alt="brand"/>
                    </Link>
                    <Nav className="mr-auto">
                        <Link to="/add" className="nav-link">Add Book</Link>
                        <Link to="/list" className="nav-link">Book List</Link>
                        <Link to="/users" className="nav-link">User List</Link>
                    </Nav>
                </Container>
            </Navbar>

        );
    }
}

export default NavigationBar;