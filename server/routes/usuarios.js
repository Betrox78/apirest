const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');


 router.get('/users', (req, res) => {
  mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
}) ; 


router.get('/users:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

router.post('/register', (req, res) => {
    const {id, name, nickname, email, password} = req.body;

        // mysqlConnection.query('INSERT INTO usuarios(id, name, nickname, email, password) VALUES (?,?,?,?)', [name,nickname,email,password], (err, rows, fields) => {
        mysqlConnection.query('INSERT INTO tiket usuarios ?', req.body, (err, rows, fields) => {
        if(!err) {
        res.json({status: 'Usuario Registrado'});
      } else {
        console.log(err);
      }
    });
  
  });


module.exports = router;