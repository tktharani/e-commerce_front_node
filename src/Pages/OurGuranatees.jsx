import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const OurGuaranteesPage = () => {
  return (
    
    <Container fluid className="our-guarantees-container d-flex justify-content-center align-items-center">
        <Row className="mb-4">
        <Col className="text-center">
          <h1 className="mb-3">Our Guarantees</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="text-center">
          <div className="d-flex flex-column ">
            <img
              src="/images/free-1.png"
              alt="Quality Guarantee"
              className="img-fluid  custom-img"
            />
            
          </div>
        </Col>
        <Col xs={12} md={6} className="text-center">
          <div className="d-flex flex-column ">
            <img
              src="/images/time-2.avif"
              alt="On-Time Guarantee"
              className="img-fluid custom-img"
            />
            
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OurGuaranteesPage;
