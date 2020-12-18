import {combineReducers} from "redux";

import userReducer from "../reducers/user-reducer";
import bookReducer from "../reducers/book-reducer";
import bookReducerTest from "../reducers/book-reducer-test";

const rootReducer = combineReducers({
    user: userReducer,
    book: bookReducer,
    bookTest: bookReducerTest
});

export default rootReducer;