import {combineReducers} from "redux";

import userReducer from "../reducers/user-reducer";
import bookReducer from "../reducers/book-reducer";

const rootReducer = combineReducers({
    user: userReducer,
    book: bookReducer
});

export default rootReducer;