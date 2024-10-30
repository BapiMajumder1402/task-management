import React from 'react';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

const LoadingPage = () => {
    return (
        <Container fluid className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col className="text-center">
                    <Spinner animation="border" role="status" variant="primary" />
                    <div className="mt-3">Loading, please wait...</div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoadingPage;
