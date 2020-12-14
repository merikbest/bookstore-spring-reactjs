import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";

import NavigationBar from "./components/parts/navigation-bar";
import Main from "./components/main";
import Footer from "./components/parts/footer";
import BookAdd from "./components/book/book-add";
import BookList from "./components/book/book-list";
import UserList from "./components/user/user-list";

function App() {
    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} className={"margin-top"}>
                        <Switch>
                            <Route path="/" exact component={Main}/>
                            <Route path="/add" exact component={BookAdd}/>
                            <Route path="/edit/:id" exact component={BookAdd}/>
                            <Route path="/list" exact component={BookList}/>
                            <Route path="/users" exact component={UserList}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    );
}

export default App;