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
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.username || !formData.password || !formData.email || !formData.fullName) {
            alert("Please fill in all fields");
            return;
        }

        // Send POST request to backend endpoint
        const response = await fetch("http://localhost:5000/user/insert", {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(formData)
        });
        const responseData = await response.json();
        if (!response.ok) {
            // Set errors state to display error messages to the user
            setErrors(responseData);

            // Check if the error includes a message about username or email already existing
            if (responseData.some(error => error.msg.toLowerCase().includes('username') || error.msg.toLowerCase().includes('email'))) {
                alert("Username or Email already exists");
            }
        } else {
            console.log("Data received", responseData);

            // Reset the form fields
            setFormData({
                username: "",
                password: "",
                email: "",
                fullName: "",
            });

            // Show success message or redirect user
            alert("You are successfully Registered");
            setErrors([]); // Clear any previous errors
        }
    };

        

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center text-danger mb-4">Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <label htmlFor="username" className="col-sm-3 col-form-label">Username</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="username" id="username" className="form-control" value={formData.username} onChange={handleChange} />
                                        {errors && errors.map((error, index) => (
                                            error.param === 'username' && <p key={index} className="text-danger">{error.msg}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="fullName" className="col-sm-3 col-form-label">Full Name</label>
                                    <div className="col-sm-9">
                                        <input type="text" name="fullName" id="fullName" className="form-control" value={formData.fullName} onChange={handleChange} />
                                        {errors && errors.map((error, index) => (
                                            error.param === 'fullName' && <p key={index} className="text-danger">{error.msg}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                                    <div className="col-sm-9">
                                        <input type="password" name="password" id="password" className="form-control" value={formData.password} onChange={handleChange} />
                                        {errors && errors.map((error, index) => (
                                            error.param === 'password' && <p key={index} className="text-danger">{error.msg}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                    <div className="col-sm-9">
                                        <input type="email" name="email" id="email" className="form-control" value={formData.email} onChange={handleChange} />
                                        {errors && errors.map((error, index) => (
                                            error.param === 'email' && <p key={index} className="text-danger">{error.msg}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-success">Register</button>
                                </div>
                                <div className="text-center">
                                    <Link to="/login">Back to Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
