import React, {Component} from 'react';
import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";

class BookAdd extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.onBookChange = this.onBookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    initialState = {
        id: "",
        title: "",
        author: "",
        coverPhotoURL: "",
        isbnNumber: "",
        price: "",
        language: "",
        genre: ""
    };

    submitBook(event) {
        event.preventDefault();

    }

    onBookChange(event) {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    render() {
        const {id, title, author, coverPhotoUrl, isbnNumber, price, language, genre} = this.state;

        return (
            <Card className={"border border-dark bg-light"}>
                <Card.Header>
                    <h2><FontAwesomeIcon icon={faList}/> Add Book</h2>
                </Card.Header>
                <Form onSubmit={this.submitBook} id="bookFormId">
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Book Title</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={this.onBookChange}
                                    placeholder="Enter Book Title"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="author"
                                    value={author}
                                    onChange={this.onBookChange}
                                    placeholder="Enter Author"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridISBNNumber">
                                <Form.Label>ISBN Number</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="isbnNumber"
                                    value={isbnNumber}
                                    onChange={this.onBookChange}
                                    placeholder="Enter Book Title"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCoverPhotoUrl">
                                <Form.Label>Photo URL</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="coverPhotoUrl"
                                    value={coverPhotoUrl}
                                    onChange={this.onBookChange}
                                    placeholder="Enter Book Title"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="price"
                                    value={price}
                                    onChange={this.onBookChange}
                                    placeholder="Enter Book Price"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridLanguage">
                                <Form.Label>Language</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="language"
                                    value={language}
                                    onChange={this.onBookChange}
                                    placeholder="Enter Book Title"/>
                            </Form.Group>
                        </Form.Row>
                        <Card.Footer style={{textAlign: "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faPlusSquare}/> Add
                            </Button>
                        </Card.Footer>
                    </Card.Body>
                </Form>
            </Card>
        );
    }
}

export default BookAdd;