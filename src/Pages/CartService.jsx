import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Update with your actual backend API URL

const CartService = {
    addToCart: async (userId, productId, quantity) => {
        try {
            const response = await axios.post(`${API_URL}/add-cart`, {
                userId,
                productId,
                quantity
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Failed to add item to cart');
        }
    },
    updateCartItemQuantity: async (cartItemId, quantity) => {
        try {
            const response = await axios.put(`${API_URL}/update-quantity/${cartItemId}`, { quantity });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Failed to update cart item quantity');
        }
    },
    deleteCartItem: async (cartItemId) => {
        try {
            const response = await axios.delete(`${API_URL}/delete/${cartItemId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error || 'Failed to delete cart item');
        }
    },
    getCartItems: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/cart-items/${userId}`);
            return response.data.cartItems;
        } catch (error) {
            throw new Error(error.response.data.error || 'Failed to fetch cart items');
        }
    },
    calculateTotalPrice: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/cart-total/${userId}`);
            return response.data.totalPrice;
        } catch (error) {
            throw new Error(error.response.data.error || 'Failed to calculate total price');
        }
    }
};

export default CartService;
