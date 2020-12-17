import {
    SAVE_BOOK_REQUEST,
    FETCH_BOOK_REQUEST,
    FETCH_BOOKS_REQUEST,
    UPDATE_BOOK_REQUEST,
    DELETE_BOOK_REQUEST,
    BOOK_SUCCESS,
    BOOKS_SUCCESS,
    BOOK_FAILURE
} from "../actions/book-types";

const initialState = {
    books: {},
    book: "",
    error: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_BOOK_REQUEST || UPDATE_BOOK_REQUEST || FETCH_BOOK_REQUEST || DELETE_BOOK_REQUEST || FETCH_BOOKS_REQUEST:
            return {
                ...state
            };
        case BOOKS_SUCCESS:
            return {
                books: action.payload,
                book: "",
                error: ""
            };
        case BOOK_SUCCESS:
            return {
                books: {},
                book: action.payload,
                error: ""
            };
        case BOOK_FAILURE:
            return {
                books: [],
                book: "",
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;



