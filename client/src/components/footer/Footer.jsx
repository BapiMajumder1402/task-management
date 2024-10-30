import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>We are a Tasks management platform providing amazing content across various domains.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/manage-tasks" className="text-light">Manage Tasks</a></li>
              <li><a href="/login" className="text-light">Login</a></li>
              <li><a href="/register" className="text-light">Register</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p>Email: nbbapim@gmail.com</p>
            <p>Phone: +91 7005643072</p>
          </Col>
        </Row>
        <div className="text-center mt-3">
          &copy; {new Date().getFullYear()} MyApp. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
};

export default React.memo(Footer);
