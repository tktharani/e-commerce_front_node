import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        fullName: "",
        role: "user",
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log(name, value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        // Send POST request to backend endpoint
        const response = await fetch("http://localhost:5000/user/insert", {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(formData)
        });

        // Check if the response status is successful (200 OK)
        if (response.ok) {
            // Parse the response JSON data
            const responseData = await response.json();
            console.log("Data received", responseData);

            // Show success message or redirect user
            alert("Your are successfully Registered");
            // Optionally, redirect user to login page or another page
            // window.location.href = '/login';

            // Reset the form fields
            setFormData({
                username: "",
                password: "",
                email: "",
                fullName: "",
                
            });
            setErrors([]); // Clear any previous errors
        } else {
            // Handle validation errors or other backend errors
            const errorData = await response.json();
            console.error("Error registering user:", errorData);
            // Set errors state to display error messages to the user
            setErrors(errorData);
        }
    };

    return (
        <div>
            <div className="container bg-secondary p-5">
                <h2 className='text-uppercase text-danger mb-4'>Register form</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="username" className="text-white p-2">Username</label>
                        <input type="text" name="username" id="username" className="form-control" value={formData.username} onChange={handleChange} />
                        {errors && errors.map((error, index) => (
                            error.param === 'username' && <p key={index} className="text-danger">{error.msg}</p>
                        ))}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="text-white p-2">Password</label>
                        <input type="password" name="password" id="password" className="form-control" value={formData.password} onChange={handleChange} />
                        {errors && errors.map((error, index) => (
                            error.param === 'password' && <p key={index} className="text-danger">{error.msg}</p>
                        ))}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="text-white p-2">Email</label>
                        <input type="email" name="email" id="email" className="form-control" value={formData.email} onChange={handleChange} />
                        {errors && errors.map((error, index) => (
                            error.param === 'email' && <p key={index} className="text-danger">{error.msg}</p>
                        ))}
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullName" className="text-white p-2">Full Name</label>
                        <input type="text" name="fullName" id="fullName" className="form-control" value={formData.fullName} onChange={handleChange} />
                        {errors && errors.map((error, index) => (
                            error.param === 'fullName' && <p key={index} className="text-danger">{error.msg}</p>
                        ))}
                    </div>
                    <button type="submit" className="btn btn-success mr-2">Register</button>
                    <Link to="/login" className="text-white">Back to Login</Link>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
