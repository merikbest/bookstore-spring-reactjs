import React, {Component} from 'react';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
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
import {connect} from "react-redux";
import {deleteBook, fetchBooks, searchBook} from "../../actions/book-actions";
import PropTypes from "prop-types";

import MyToast from "../parts/my-toast";

import "../style.css";

class BookList extends Component {
    state = {
        search: "",
        booksPerPage: 5,
        sortDir: "asc",
        show: false
    };

    componentDidMount() {
        this.findAllBooks(this.props.booksData.books.currentPage);
    }

    findAllBooks = (currentPage) => {
        currentPage -= 1;
        const {booksPerPage, sortDir} = this.state;

        this.props.fetchBooks(currentPage, booksPerPage, sortDir);
    };

    deleteBook = (bookId) => {
        this.props.deleteBook(bookId);

        const {currentPage} = this.props.booksData.books;

        setTimeout(() => {
            if (this.props.bookObject != null) {
                this.setState({
                    show: true
                });
                setTimeout(() =>
                    this.setState({
                        show: false
                    }), 3000);
                this.findAllBooks(currentPage);
            } else {
                this.setState({
                    show: false
                });
            }
        });
    };

    sortData = () => {
        const {sortDir} = this.state;
        const {currentPage} = this.props.booksData.books;

        setTimeout(() => {
            sortDir === "asc" ?
                this.setState({
                    sortDir: "desc"
                }) :
                this.setState({
                    sortDir: "asc"
                });
            this.findAllBooks(currentPage);
        }, 500);
    };

    changePage = (event) => {
        const {search} = this.state;
        const {name, value} = event.target;
        let targetPage = parseInt(value);

        if (isNaN(parseInt(value))) {
            this.setState({
                [name]: 1
            });
        } else {
            if (search) {
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
        const {search} = this.state;
        const {currentPage} = this.props.booksData.books;
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
        const {search} = this.state;
        const {currentPage} = this.props.booksData.books;

        if (currentPage > 1) {
            if (search) {
                this.searchData(currentPage - 1);
            } else {
                this.findAllBooks(currentPage - 1);
            }
        }
    };

    lastPage = () => {
        const {booksPerPage, search} = this.state;
        const {currentPage, totalElements} = this.props.booksData.books;

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
        const {booksPerPage, search} = this.state;
        const {currentPage, totalElements} = this.props.booksData.books;

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
        const {currentPage} = this.props.booksData.books;

        this.setState({
            search: ""
        });

        this.findAllBooks(currentPage);
    };

    searchData = (currentPage) => {
        const {booksPerPage, search} = this.state;
        currentPage -= 1;

        this.props.searchBook(search, currentPage, booksPerPage);
    };

    render() {
        const {search, sortDir, show} = this.state;
        const {content, currentPage, totalPages} = this.props.booksData.books;

        return (
            <div>
                <div style={{"display": show ? "block" : "none"}}>
                    <MyToast show={show} message={"Book deleted successfully"} type={"danger"}/>
                </div>
                <Card className="border border-dark bg-light">
                    <Card.Header>
                        <div style={{"float": "left"}}>
                            <FontAwesomeIcon icon={faList}/> Book List
                        </div>
                        <div style={{"float": "right"}}>
                            <InputGroup size="sm">
                                <FormControl placeholder="Search" name="search" value={search}
                                             className="info-border bg-light"
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
                                <th onClick={this.sortData}>Price
                                    <div className={sortDir === "asc" ? "arrow arrow-up" : "arrow arrow-down"}></div>
                                </th>
                                <th>Language</th>
                                <th>Genre</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {content.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">Books available</td>
                                </tr> :
                                content.map((book) => (
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
                    {content.length > 0 ?
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

BookList.propTypes = {
    fetchBooks: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    searchBook: PropTypes.func.isRequired,
    bookObject: PropTypes.object.isRequired,
    booksData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    bookObject: state.book,
    booksData: state.book
});

export default connect(mapStateToProps, {fetchBooks, deleteBook, searchBook})(BookList);