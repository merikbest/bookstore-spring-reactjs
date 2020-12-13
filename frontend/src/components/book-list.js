import React, {Component} from 'react';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl, Nav} from 'react-bootstrap';
import axios from "axios";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

import MyToast from "./my-toast";

class BookList extends Component {
    state = {
        books: [],
        show: false
    };

    componentDidMount() {
        axios.get("http://localhost:8080/books/all")
            .then((response) => {
                this.setState({
                    books: response.data
                });
            });
    }

    deleteBook = (bookId) => {
        axios.delete("http://localhost:8080/books/" + bookId)
            .then((response) => {
                this.setState({show: true});
                setTimeout(() => this.setState({show: false}), 3000);

                if (response.data != null) {
                    this.setState({
                        books: this.state.books.filter(book => book.id !== bookId)
                    });
                } else {
                    this.setState({show: false});
                }
            });
    };

    render() {
        const {books} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"Book deleted successfully"} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-light"}>
                    <Card.Header>Book list</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="light">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>ISBN Number</th>
                                <th>Price</th>
                                <th>Language</th>
                                <th>Genre</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">Books available</td>
                                </tr> :
                                books.map((book) => (
                                    <tr key={book.id}>
                                        <td>
                                            <Image src={book.coverPhotoURL} roundedCircle width="25" height="25"/>
                                            {book.title}
                                        </td>
                                        <td>{book.author}</td>
                                        <td>{book.isbnNumber}</td>
                                        <td>{book.price}</td>
                                        <td>{book.language}</td>
                                        <td>{book.genre}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link
                                                    to={`/edit/${book.id}`}
                                                    className="btn btn-sm btn-outline-primary">
                                                    <FontAwesomeIcon icon={faEdit}/>
                                                </Link>
                                                <Button
                                                    size="sm"
                                                    onClick={() => this.deleteBook(book.id)}
                                                    variant="outline-danger">
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default BookList;