import React, {Component} from 'react';
import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faUndo} from "@fortawesome/free-solid-svg-icons";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import MyToast from "./my-toast";

class BookAdd extends Component {
    initialState = {
        title: "",
        author: "",
        coverPhotoUrl: "",
        isbnNumber: "",
        price: "",
        language: "",
        genre: ""
    }

    state = {
        initialState: this.initialState,
        show: false
    }

    submitBook = (event) => {
        event.preventDefault();

        const {title, author, coverPhotoUrl, isbnNumber, price, language, genre} = this.state;
        const book = {title, author, coverPhotoUrl, isbnNumber, price, language, genre};

        axios.post("http://localhost:8080/books", book)
            .then((response) => {
                if (response != null) {
                    this.setState({show: true});
                    setTimeout(() => this.setState({show: false}), 3000);
                } else {
                    this.setState({show: false});
                }
            });

        this.setState(this.initialState);
    };

    resetBook = () => {
        this.setState(() => this.initialState);
    };

    onBookChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {title, author, coverPhotoUrl, isbnNumber, price, language, genre} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast children={{show: this.state.show, message: "Book saved successfully"}}/>
                </div>
                <Card className={"border border-dark bg-light"}>
                    <Card.Header>
                        <h2><FontAwesomeIcon icon={faList}/> Add Book</h2>
                    </Card.Header>
                    <Form
                        onReset={this.resetBook}
                        onSubmit={this.submitBook}
                        id="bookFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Book Title</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete="off"
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
                                        autoComplete="off"
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
                                        autoComplete="off"
                                        type="text"
                                        name="isbnNumber"
                                        value={isbnNumber}
                                        onChange={this.onBookChange}
                                        placeholder="Enter Book ISBN Number"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCoverPhotoUrl">
                                    <Form.Label>Photo URL</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete="off"
                                        type="text"
                                        name="coverPhotoUrl"
                                        value={coverPhotoUrl}
                                        onChange={this.onBookChange}
                                        placeholder="Enter Book Photo"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete="off"
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
                                        autoComplete="off"
                                        type="text"
                                        name="language"
                                        value={language}
                                        onChange={this.onBookChange}
                                        placeholder="Enter Book Language"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete="off"
                                        type="text"
                                        name="genre"
                                        value={genre}
                                        onChange={this.onBookChange}
                                        placeholder="Enter Book Genre"/>
                                </Form.Group>
                            </Form.Row>
                            <Card.Footer style={{textAlign: "right"}}>
                                <Button size="sm" variant="success" type="submit">
                                    <FontAwesomeIcon icon={faPlusSquare}/> Add
                                </Button>{" "}
                                <Button size="sm" variant="info" type="reset">
                                    <FontAwesomeIcon icon={faUndo}/> Reset
                                </Button>
                            </Card.Footer>
                        </Card.Body>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default BookAdd;