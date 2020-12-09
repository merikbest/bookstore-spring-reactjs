import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";

import NavigationBar from "./components/navigation-bar";
import Main from "./components/main";
import Footer from "./components/footer";
import BookAdd from "./components/book-add";
import BookList from "./components/book-list";

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
                            <Route path="/list" exact component={BookList}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    );
}

export default App;