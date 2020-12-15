import React, {Component} from 'react';
import {connect} from "react-redux";
import {Card, Table, Button, InputGroup, FormControl, Alert} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsers, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';

import {fetchUsers} from "../../actions/user-actions";
import "../style.css";

class UserList extends Component {
    state = {
        currentPage: 1,
        usersPerPage: 5
    };

    componentDidMount() {
        this.props.fetchUsers();
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
        const {currentPage, usersPerPage} = this.state;
        let usersLength = this.props.userData.users.length;

        if (currentPage < Math.ceil(usersLength / usersPerPage)) {
            this.setState({
                currentPage: Math.ceil(usersLength / usersPerPage)
            });
        }
    };

    nextPage = () => {
        const {currentPage, usersPerPage} = this.state;
        let usersLength = this.props.userData.users.length;

        if (currentPage < Math.ceil(usersLength / usersPerPage)) {
            this.setState({
                currentPage: currentPage + 1
            });
        }
    };

    render() {
        const userDataError = this.props.userData.error;
        const users = this.props.userData.users;
        const {currentPage, usersPerPage} = this.state;

        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentUsers = users.slice(firstIndex, lastIndex);
        const totalPages = users.length / usersPerPage;

        return (
            <div>
                {userDataError ?
                    <Alert variant="danger">
                        {userDataError}
                    </Alert> :
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
                                        <FormControl className="page-num bg-light" name="currentPage"
                                                     value={currentPage}
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
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);