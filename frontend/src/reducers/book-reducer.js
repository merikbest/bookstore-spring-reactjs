import {BOOK_SUCCESS, BOOKS_SUCCESS, BOOK_FAILURE, LANGUAGES_SUCCESS, GENRES_SUCCESS} from "../actions/book-types";

const initialState = {
    books: {
        content: [],
        totalPages: "",
        totalElements: "",
        currentPage: 1
    },
    book: "",
    error: "",
    languages: [],
    genres: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOKS_SUCCESS:
            return {
                ...state,
                books: {
                    content: action.payload.content,
                    totalPages: action.payload.totalPages,
                    totalElements: action.payload.totalElements,
                    currentPage: action.payload.number + 1,
                }
            };
        case BOOK_SUCCESS:
            return {
                ...state,
                book: action.payload,
            };
        case LANGUAGES_SUCCESS:
            return {
                ...state,
                languages: action.payload
            };
        case GENRES_SUCCESS:
            return {
                ...state,
                genres: action.payload
            };
        case BOOK_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;



