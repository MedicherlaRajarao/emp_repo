const express = require('express');
const router = express.Router();
const db = require('./db');


router.post('/employees', (req, res) => {
    const { name, phone, role } = req.body;
    const query = 'INSERT INTO employees (name, phone, role) VALUES (?, ?, ?)';
    db.query(query, [name, phone, role], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: result.insertId, name, phone, role });
    });
});


router.get('/employees', (req, res) => {
    const query = 'SELECT * FROM employees';  
    db.query(query, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);  
    });
});
router.get('/employees/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const query = 'SELECT * FROM employees WHERE id = ?';
    
    db.query(query, [employeeId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) {
            res.json(result[0]); 
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    });
});


router.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, phone, role } = req.body;
    const query = 'UPDATE employees SET name = ?, phone = ?, role = ? WHERE id = ?';
    db.query(query, [name, phone, role, id], err => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Employee updated successfully!' });
    });
});


router.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM employees WHERE id = ?';
    db.query(query, [id], err => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Employee deleted successfully!' });
    });
});

module.exports = router;
