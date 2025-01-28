import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/employees')
            .then(response => {
                console.log('Employee data:', response.data);
                setEmployees(response.data);
            })
            .catch(error => console.error('Error fetching employees:', error));
    },  []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/employees/${id}`)
            .then(() => {
               
                setEmployees(prev => prev.filter(emp => emp.id !== id));
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Employee List</h1>
            <Link to="/add">Add Employee</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.phone}</td>
                            <td>{emp.role}</td>
                            <td>
                                <Link to={`/edit/${emp.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
