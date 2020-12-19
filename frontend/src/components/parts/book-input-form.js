import React, {Component} from 'react';
import {Button, Card, Col, Form, Image, InputGroup} from "react-bootstrap";
import {faEdit, faList, faPlusSquare, faUndo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {fetchBook, findAllLanguages, findAllGenres} from "../../actions/book-actions";
import MyToast from "./my-toast";

class BookInputForm extends Component {
    initialState = {
        id: "",
        title: "",
        author: "",
        coverPhotoURL: "",
        isbnNumber: "",
        price: ""
    };

    state = {
        initialState: this.initialState,
        show: false,
        method: "",
        languages: [],
        genres: []
    };

    componentDidMount() {
        const {bookId} = this.props;

        if (bookId) {
            this.findBookById(bookId);
        }

        this.findAllLanguages();
        this.findAllGenres();
    }

    submitAddedBook = (event) => {
        event.preventDefault();

        const {title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;
        const book = {title, author, coverPhotoURL, isbnNumber, price, language, genre};

        this.props.addBook(book);

        this.setState(this.initialState);
    };

    submitEditedBook = (event) => {
        event.preventDefault();

        const {id, title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;
        const book = {id, title, author, coverPhotoURL, isbnNumber, price, language, genre};

        this.props.editBook(book);

        this.setState(this.initialState);
    }

    findBookById = (bookId) => {
        this.props.fetchBook(bookId);

        let book = this.props.bookObject.book;

        if (book != null) {
            this.setState({
                id: book.id,
                title: book.title,
                author: book.author,
                coverPhotoURL: book.coverPhotoURL,
                isbnNumber: book.isbnNumber,
                price: book.price,
                language: book.language,
                genre: book.genre
            });
        }
    };

    onBookChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    resetBook = () => {
        this.setState(() => this.initialState);
    };

    bookList = () => {
        return this.props.history.push("/list");
    };

    findAllLanguages = () => {
        this.props.findAllLanguages();

        this.setState({
            languages: [{value: "", display: 'Select Language'}]
                .concat(this.props.bookLanguages.languages.map((language) => {
                    return {value: language, display: language}
                }))
        });
    };

    findAllGenres = () => {
        this.props.findAllGenres();

        this.setState({
            genres: [{value: "", display: "Select Genre"}]
                .concat(this.props.bookGenres.genres.map((genre) => {
                    return {value: genre, display: genre}
                }))
        });
    };

    render() {
        const {id, title, author, coverPhotoURL, isbnNumber, price, language, genre, languages, genres} = this.state;
        const {bookId, show, method} = this.props;

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
                            {bookId ? " Update Book" : " Add Book"}
                        </h2>
                    </Card.Header>
                    <Form
                        onReset={this.resetBook}
                        onSubmit={bookId ? this.submitEditedBook : this.submitAddedBook}
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
                                <Form.Group as={Col} controlId="formGridCoverPhotoUrl">
                                    <Form.Label>Photo URL</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            required
                                            autoComplete="off"
                                            type="text"
                                            name="coverPhotoURL"
                                            value={coverPhotoURL}
                                            onChange={this.onBookChange}
                                            placeholder="Enter Book Photo"/>
                                        <InputGroup.Append>
                                            {coverPhotoURL !== "" &&
                                            <Image src={coverPhotoURL} roundedRight width="40" height="38"/>}
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
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
                                        required as="select"
                                        custom onChange={this.onBookChange}
                                        name="language"
                                        value={language}>
                                        {languages.map((language) =>
                                            <option key={language.value} value={language.value}>
                                                {language.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control
                                        required as="select"
                                        custom onChange={this.onBookChange}
                                        name="genre"
                                        value={genre}>
                                        {genres.map((genre) =>
                                            <option key={genre.value} value={genre.value}>
                                                {genre.display}
                                            </option>
                                        )}
                                    </Form.Control>
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

BookInputForm.propTypes = {
    fetchBook: PropTypes.func.isRequired,
    findAllLanguages: PropTypes.func.isRequired,
    findAllGenres: PropTypes.func.isRequired,
    bookObject: PropTypes.object.isRequired,
    bookLanguages: PropTypes.object.isRequired,
    bookGenres: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    bookObject: state.book,
    bookLanguages: state.book,
    bookGenres: state.book
});

export default connect(mapStateToProps, {fetchBook, findAllLanguages, findAllGenres})(BookInputForm);
