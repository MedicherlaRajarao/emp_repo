import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeList from './EmployeeList';

const EmployeeEdit = () => {
    const { id } = useParams();  
    const [employee, setEmployee] = useState({ name: '', phone: '', role: '' });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        
        axios.get(`http://localhost:5000/api/employees/${id}`)
            .then(response => {
                setEmployee(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/employees/${id}`, employee)
            .then(() => {
                alert('Employee updated successfully!');
                navigate('/');  
            })
            .catch(error => console.error('Error updating employee:', error));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Employee</h1>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={employee.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={employee.role}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
};

export default EmployeeEdit;
