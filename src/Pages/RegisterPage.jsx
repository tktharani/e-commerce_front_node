import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        fullName: "",
        phonenumber:"",
        role: "user",
        // Add address fields to the form state
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.username || !formData.password || !formData.email || !formData.fullName ||!formData.phonenumber) {
            alert("Please fill in all fields");
            return;
        }
        try{
        // Send POST request to backend endpoint
        const response = await fetch("http://localhost:5000/user/insert", {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                ...formData,
                addressData: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    country: formData.country
                }
            })
        });
        const responseData = await response.json();
        if (!response.ok) {
            // Set errors state to display error messages to the user
            setErrors(responseData.errors || []);

            // Check if the error includes a message about username or email already existing
            if (responseData.errors && responseData.errors.length > 0) {
                alert(responseData.errors[0].msg);
            }
        } else {
            console.log("Data received", responseData);

            // Reset the form fields
            setFormData({
                username: "",
                password: "",
                email: "",
                fullName: "",
                phonenumber:"",
                // Reset address fields
                street: "",
                city: "",
                state: "",
                postalCode: "",
                country: ""
            });

            // Show success message or redirect user
            alert("You are successfully Registered");
            setErrors([]); // Clear any previous errors
        }
    }catch (error) {
            console.error('Error during registration:', error);
            alert("Registration failed. Please try again later.");
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
                                {errors && Array.isArray(errors) && errors.map((error, index) => (
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
                        <div className="form-group row">
                            <label htmlFor="phonenumber" className="col-sm-3 col-form-label">PhoneNumber</label>
                            <div className="col-sm-9">
                                <input type="phonenumber" name="phonenumber" id="phonenumber" className="form-control" value={formData.phonenumber} onChange={handleChange} />
                                {errors && errors.map((error, index) => (
                                    error.param === 'phonenumber' && <p key={index} className="text-danger">{error.msg}</p>
                                ))}
                            </div>
                        </div>
                        {/* Address Fields */}
                        <div className="form-group row">
                            <label htmlFor="street" className="col-sm-3 col-form-label">Street</label>
                            <div className="col-sm-9">
                                <input type="text" name="street" id="street" className="form-control" value={formData.street} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="city" className="col-sm-3 col-form-label">City</label>
                            <div className="col-sm-9">
                                <input type="text" name="city" id="city" className="form-control" value={formData.city} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="state" className="col-sm-3 col-form-label">State</label>
                            <div className="col-sm-9">
                                <input type="text" name="state" id="state" className="form-control" value={formData.state} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="postalCode" className="col-sm-3 col-form-label">Postal Code</label>
                            <div className="col-sm-9">
                                <input type="text" name="postalCode" id="postalCode" className="form-control" value={formData.postalCode} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="country" className="col-sm-3 col-form-label">Country</label>
                            <div className="col-sm-9">
                                <input type="text" name="country" id="country" className="form-control" value={formData.country} onChange={handleChange} />
                            </div>
                        </div>
                        {/* End Address Fields */}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
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
