import React, {Component} from 'react';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';

class BookList extends Component {
    render() {
        return (
            <Card className={"border border-dark bg-light"}>
                <Card.Header>Book list</Card.Header>
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

                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}

export default BookList;