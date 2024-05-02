import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import LoginModal from './LoginModal';

const AllProduct = () => {
    const [products, setProducts] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/product/list');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (productId) => {
        // Check if the user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            // User is not logged in, show the login modal
            setShowLoginModal(true);
        } else {
            // User is logged in, implement your addToCart logic here
            console.log('Add to cart:', productId);
        }
    };


    return (
        <Container>
            <h1>Product List</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} md={4}>
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>Price: ${product.price}</Card.Text>
                                <Button variant="primary" onClick={() => addToCart(product._id)}>Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {/* Render the LoginModal component */}
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
       
        </Container>
        
    );
};

export default AllProduct;
