import React from 'react';
import {Jumbotron} from 'react-bootstrap';

function Main() {
    return (
        <Jumbotron className="bg-light">
            <h1>Welcome to book shop</h1>
            <blockquote className="blockquote mb-0">
                <p>
                    "Good friends, good books, and a sleepy conscience: this is the ideal life."
                </p>
                <footer className="blockquote-footer">
                    "Mark Twain"
                </footer>
            </blockquote>
        </Jumbotron>
    );
}

export default Main;