import React, {Component} from 'react';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import axios from "axios";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class BookList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/rest/books")
            .then((response) => {
                this.setState({
                    books: response.data
                });
            });
    }

    render() {
        const {books} = this.state;

        return (
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
                                <td colSpan="6">Books available/</td>
                            </tr> :
                            books.map((book) => (
                                <tr key={book.id}>
                                    <td>
                                        <Image src={book.coverPhotoUrl} roundedCircle width="25" height="25"/>
                                        {book.title}
                                    </td>
                                    <td>{book.author}</td>
                                    <td>{book.isbnNumber}</td>
                                    <td>{book.price}</td>
                                    <td>{book.language}</td>
                                    <td>{book.genre}</td>
                                    <td>{book.actions}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button size="sm" variant="outline-primary">
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </Button>
                                            <Button size="sm" variant="outline-danger">
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
        );
    }
}

export default BookList;