import {BOOK_SUCCESS, BOOKS_SUCCESS, BOOK_FAILURE, LANGUAGES_SUCCESS, GENRES_SUCCESS} from "./book-types";
import axios from 'axios';

export const saveBook = (book) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:8080/books", book);

        dispatch({
            type: BOOK_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: BOOK_FAILURE,
            payload: error.response.data
        })
    }
};

export const updateBook = (book) => async (dispatch) => {
    try {
        const response = await axios.put("http://localhost:8080/books", book);

        dispatch({
            type: BOOK_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: BOOK_FAILURE,
            payload: error.response.data
        })
    }
};

export const fetchBooks = (currentPage, booksPerPage, sortDir) => async (dispatch) => {
    const response = await axios.get(`http://localhost:8080/books?page=${currentPage}&size=${booksPerPage}&sortBy=price&sortDir=${sortDir}`);

    dispatch({
        type: BOOKS_SUCCESS,
        payload: response.data
    })
};

export const fetchBook = (bookId) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:8080/books/${bookId}`)

        dispatch({
            type: BOOK_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: BOOK_FAILURE,
            payload: error.response.data
        })
    }
};

export const deleteBook = (bookId) => async (dispatch) => {
    try {
        const response = await axios.delete(`http://localhost:8080/books/${bookId}`)

        dispatch({
            type: BOOK_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: BOOK_FAILURE,
            payload: error.response.data
        })
    }
};

export const searchBook = (search, currentPage, booksPerPage) => async (dispatch) => {
    const response = await axios.get(`http://localhost:8080/books/search/${search}?page=${currentPage}&size=${booksPerPage}`);

    dispatch({
        type: BOOKS_SUCCESS,
        payload: response.data
    })
};

export const findAllLanguages = () => async (dispatch) => {
    const response = await axios.get("http://localhost:8080/books/languages");

    dispatch({
        type: LANGUAGES_SUCCESS,
        payload: response.data
    })
};

export const findAllGenres = () => async (dispatch) => {
    const response = await axios.get("http://localhost:8080/books/genres");

    dispatch({
        type: GENRES_SUCCESS,
        payload: response.data
    })
};