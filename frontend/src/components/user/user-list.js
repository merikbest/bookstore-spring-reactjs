import React, {Component} from 'react';
import {Card, Table, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {faUsers, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';

import "./user-list.css";

class UserList extends Component {
    state = {
        users: [],
        currentPage: 1,
        usersPerPage: 5
    };

    componentDidMount() {
        axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
            .then((response) => {
                this.setState({
                    users: response.data
                });
            });
    }

    changePage = (event) => {
        const {name, value} = event.target;

        if (isNaN(parseInt(value))) {
            this.setState({
                [name]: 1
            });
        } else {
            this.setState({
                [name]: parseInt(value)
            });
        }
    };

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        let usersLength = this.state.users.length;
        if (this.state.currentPage < Math.ceil(usersLength / this.state.usersPerPage)) {
            this.setState({
                currentPage: Math.ceil(usersLength / this.state.usersPerPage)
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    render() {
        const {users, currentPage, usersPerPage} = this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentUsers = users.slice(firstIndex, lastIndex);
        const totalPages = users.length / usersPerPage;

        return (
            <div>
                <Card className="border border-dark bg-light">
                    <Card.Header><FontAwesomeIcon icon={faUsers}/> User List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="light">
                            <thead>
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Address</td>
                                <td>Created</td>
                                <td>Balance</td>
                            </tr>
                            </thead>
                            <tbody>
                            {users.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">No Users Available</td>
                                </tr> :
                                currentUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.first}{" "}{user.last}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.created}</td>
                                        <td>{user.balance}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                    {users.length > 0 ?
                        <Card.Footer>
                            <div style={{"float": "left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float": "right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward}/> First
                                        </Button>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward}/> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl className="page-num bg-light" name="currentPage" value={currentPage}
                                                 onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward}/> Next
                                        </Button>
                                        <Button type="button" variant="outline-info"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward}/> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer> : null
                    }
                </Card>
            </div>
        );
    }
}

export default UserList;