import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUsPage = () => {
  return (
    <Container fluid className="about-us-container d-flex align-items-center justify-content-center">
      <Row>
        <Col md={6}>
          <div className="text-center ">
            <h1>About Us</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec ligula ac dui
              ultricies tristique. Integer non metus eget nulla feugiat ultricies sit amet vel
              justo.
            </p>
            <p>
              Sed tempus lectus id felis sagittis, at efficitur nisi varius. Vivamus fringilla
              quam ut mauris volutpat, sed hendrerit libero venenatis. Nullam nec magna eu mi
              venenatis consectetur.
            </p>
            <p>
              Sed tempus lectus id felis sagittis, at efficitur nisi varius. Vivamus fringilla
              quam ut mauris volutpat, sed hendrerit libero venenatis. Nullam nec magna eu mi
              venenatis consectetur.
            </p>
          </div>
        </Col>
        <Col md={6} className="text-center">
          <img
            src="/images/about-us-image.jpg"
            alt="About Us Image"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsPage;
