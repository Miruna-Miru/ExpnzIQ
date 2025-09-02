
import React, { useState } from "react";


function myForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(formData);
        setFormData({ name: '', email: '', password: '' });

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Name :</label>
                <input
                    name='name'
                    value={formData.name}
                    required
                    onChange={handleChange}
                    type="text" />
                <label>Email:</label>
                <input
                    name='email'
                    value={formData.email}
                    required
                    onChange={handleChange}
                    type="email" />


                <label>Password:</label>
                <input
                    name='password'
                    value={formData.password}
                    required
                    onChange={handleChange}
                    type="password" />
                 <button type="submit" style={{ marginTop: '15px' }}>Submit</button>

            </form>
            
        </>
    );
}

export default myForm;