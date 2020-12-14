import React, {Component} from 'react';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import axios from "axios";
import {
    faEdit,
    faFastBackward,
    faFastForward, faList, faSearch,
    faStepBackward,
    faStepForward, faTimes,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

import MyToast from "../parts/my-toast";

import "./book-list.css";

class BookList extends Component {
    state = {
        books: [],
        search: "",
        currentPage: 1,
        booksPerPage: 5,
        sortDir: "asc"
    };

    componentDidMount() {
        this.findAllBooks(this.state.currentPage);
    }

    findAllBooks = (currentPage) => {
        currentPage -= 1;
        const {booksPerPage, sortDir} = this.state;

        axios.get(`http://localhost:8080/books?page=${currentPage}&size=${booksPerPage}&sortBy=price&sortDir=${sortDir}`)
            .then((response) => {
                this.setState({
                    books: response.data.content,
                    totalPages: response.data.totalPages,
                    totalElements: response.data.totalElements,
                    currentPage: response.data.number + 1
                });
            });
    };

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

    sortData = () => {
        const {sortDir, currentPage} = this.state;

        setTimeout(() => {
            sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"});
            this.findAllBooks(currentPage);
        }, 500);
    };

    changePage = (event) => {
        const {name, value} = event.target;
        let targetPage = parseInt(value);

        if (isNaN(parseInt(value))) {
            this.setState({
                [name]: 1
            });
        } else {
            if (this.state.search) {
                this.searchData(targetPage);
            } else {
                this.findAllBooks(targetPage);
            }
            this.setState({
                [name]: targetPage
            });
        }
    };

    firstPage = () => {
        const {currentPage, search} = this.state;
        let firstPage = 1;

        if (currentPage > firstPage) {
            if (search) {
                this.searchData(firstPage);
            } else {
                this.findAllBooks(firstPage);
            }
        }
    };

    prevPage = () => {
        const {currentPage, search} = this.state;
        let prevPage = 1;

        if (currentPage > prevPage) {
            if (search) {
                this.searchData(currentPage - prevPage);
            } else {
                this.findAllBooks(currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        const {totalElements, booksPerPage, currentPage, search} = this.state;
        let condition = Math.ceil(totalElements / booksPerPage);

        if (currentPage < condition) {
            if (search) {
                this.searchData(condition);
            } else {
                this.findAllBooks(condition);
            }
        }
    };

    nextPage = () => {
        const {totalElements, booksPerPage, currentPage, search} = this.state;

        if (currentPage < Math.ceil(totalElements / booksPerPage)) {
            if (search) {
                this.searchData(currentPage + 1);
            } else {
                this.findAllBooks(currentPage + 1);
            }
        }
    };

    searchChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    cancelSearch = () => {
        this.setState({"search": ''});
        this.findAllBooks(this.state.currentPage);
    };

    searchData = (currentPage) => {
        const {search, booksPerPage} = this.state;
        currentPage -= 1;

        axios.get(`http://localhost:8080/books/search/${search}?page=${currentPage}&size=${booksPerPage}`)
            .then((response) => {
                this.setState({
                    books: response.data.content,
                    totalPages: response.data.totalPages,
                    totalElements: response.data.totalElements,
                    currentPage: response.data.number + 1
                });
            });
    };


    render() {
        const {books, currentPage, totalPages, search} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"Book deleted successfully"} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-light"}>
                    <Card.Header>
                        <div style={{"float": "left"}}>
                            <FontAwesomeIcon icon={faList}/> Book List
                        </div>
                        <div style={{"float": "right"}}>
                            <InputGroup size="sm">
                                <FormControl placeholder="Search" name="search" value={search}
                                             className={"info-border bg-light text-white"}
                                             onChange={this.searchChange}/>
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button"
                                            onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Header>
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
                    {books.length > 0 ?
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
                                    <FormControl className={"page-num bg-light"} name="currentPage" value={currentPage}
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

export default BookList;