import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {updateBook} from "../../actions/book-actions";
import BookInputForm from "../parts/book-input-form";

class BookEdit extends Component {
    state = {
        show: false,
        method: "",
    };

    editBook = (book) => {
        this.props.updateBook(book);

        if (this.props.updatedBookObject.book != null) {
            this.setState({
                show: true
            });
            setTimeout(() =>
                this.setState({
                    show: false,
                    method: "put"
                }), 3000);
            setTimeout(() => this.bookList(), 3000);
        } else {
            this.setState({
                show: false
            });
        }
    };

    render() {
        const {show, method} = this.state;

        return (
            <BookInputForm
                bookId={+this.props.match.params.id}
                editBook={this.editBook}
                show={show}
                method={method}/>
        );
    }
}

BookEdit.propTypes = {
    updateBook: PropTypes.func.isRequired,
    updatedBookObject: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    updatedBookObject: state.book,
});

export default connect(mapStateToProps, {updateBook})(BookEdit);
