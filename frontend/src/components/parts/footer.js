import React from 'react';
import {Navbar, Container, Col} from 'react-bootstrap';

function Footer() {
    let fullYear = new Date().getFullYear();

    return (
        <Navbar fixed="bottom" bg="light" variant="light">
            <Container>
                <Col lg={12} className="text-center text-muted">
                    <div>{fullYear}-{fullYear + 1}, merikbest</div>
                </Col>
            </Container>
        </Navbar>
    );
}

export default Footer;