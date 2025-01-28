import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', role: '' });
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/employees', formData)
            .then(() => navigate('/'))
            .catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Employee</h1>
            
            <label>
                Name:
                <input type="text" name="name" onChange={handleChange} />
            </label>
            <label>
                Phone:
                <input type="text" name="phone" onChange={handleChange} />
            </label>
            <label>
                Role:
                <input type="text" name="role" onChange={handleChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default EmployeeForm;
