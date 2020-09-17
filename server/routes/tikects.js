const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');


 router.get('/tiket', (req, res) => {
  mysqlConnection.query('SELECT * FROM tiket', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
}) ; 


router.get('/tiket/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM tiket WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

router.post('/nuevotiket', (req, res) => {
    const {name,departament,title,userAsigned,datebegin,dateend,contenido} = req.body;
   
    // mysqlConnection.query('INSERT INTO tiket(name,departament,title,userAsigned,datebegin,dateend,contenido) VALUES (?,?,?,?,?,?,?)', [name,departament,title,userAsigned,datebegin,dateend,contenido], (err, rows, fields) => {
      mysqlConnection.query('INSERT INTO tiket SET ?', req.body, (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Usuario Registrado'});
      } else {
        console.log(err);
      }
    });
  
  });

module.exports = router;