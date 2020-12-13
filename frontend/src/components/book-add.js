import React, {Component} from 'react';
import {Card, Form, Button, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faUndo} from "@fortawesome/free-solid-svg-icons";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import MyToast from "./my-toast";

class BookAdd extends Component {
    initialState = {
        id: "",
        title: "",
        author: "",
        coverPhotoURL: "",
        isbnNumber: "",
        price: "",
        language: "",
        genre: "",
    };

    state = {
        initialState: this.initialState,
        show: false,
        method: ""
    };

    componentDidMount() {
        const bookId = +this.props.match.params.id;

        if (bookId) {
            this.findBookById(bookId);
        }
    }

    resetBook = () => {
        this.setState(() => this.initialState);
    };

    bookList = () => {
        return this.props.history.push("/list");
    };

    submitBook = (event) => {
        event.preventDefault();

        const {title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;
        const book = {title, author, coverPhotoURL, isbnNumber, price, language, genre};

        axios.post("http://localhost:8080/books", book)
            .then((response) => {
                if (response != null) {
                    this.setState({show: true});
                    setTimeout(() => this.setState({show: false, method: "post"}), 3000);
                } else {
                    this.setState({show: false});
                }
            });

        this.setState(this.initialState);
    };

    updateBook = (event) => {
        event.preventDefault();

        const {id, title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;
        const book = {id, title, author, coverPhotoURL, isbnNumber, price, language, genre};

        axios.put("http://localhost:8080/books", book)
            .then((response) => {
                if (response != null) {
                    this.setState({show: true});
                    setTimeout(() => this.setState({show: false, method: "put"}), 3000);
                    setTimeout(() => this.bookList(), 3000);
                } else {
                    this.setState({show: false});
                }
            });

        this.setState(this.initialState);
    };

    findBookById = (bookId) => {
        axios.get("http://localhost:8080/books/" + bookId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        author: response.data.author,
                        coverPhotoURL: response.data.coverPhotoURL,
                        isbnNumber: response.data.isbnNumber,
                        price: response.data.price,
                        language: response.data.language,
                        genre: response.data.genre
                    });
                }
            }).catch((error) => {
            console.error("Error - " + error);
        });
    };

    onBookChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {id, title, author, coverPhotoURL, isbnNumber, price, language, genre, show, method} = this.state;

        return (
            <div>
                <div style={{"display": show ? "block" : "none"}}>
                    <MyToast
                        show={show}
                        message={method === "put" ? "Book updated successfully" : "Book saved successfully"}
                        type={"success"}/>
                </div>
                <Card className={"border border-dark bg-light"}>
                    <Card.Header>
                        <h2><FontAwesomeIcon icon={id ? faEdit : faList}/>
                            {id ? " Update Book" : " Add Book"}
                        </h2>
                    </Card.Header>
                    <Form
                        onReset={this.resetBook}
                        onSubmit={id ?  this.updateBook : this.submitBook}
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
                                        name="coverPhotoURL"
                                        value={coverPhotoURL}
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
                                    <FontAwesomeIcon icon={faPlusSquare}/>
                                    {id ? "Update" : "Add"}
                                </Button>{" "}
                                <Button size="sm" variant="info" type="reset">
                                    <FontAwesomeIcon icon={faUndo}/> Reset
                                </Button>{" "}
                                <Button size="sm" variant="info" type="button" onClick={this.bookList}>
                                    <FontAwesomeIcon icon={faList}/> Book list
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