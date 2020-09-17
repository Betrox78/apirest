const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');


 router.get('/prueba', (req, res) => {
  mysqlConnection.query('SELECT * FROM prueba', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
}) ; 


router.get('/prueba/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM prueba WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

router.post('/nuevoprueba', (req, res) => {
    const {RazonSocial,RFC,Activo,RegimenFiscal,RegimenFiscalNombre} = req.body;
   
    // mysqlConnection.query('INSERT INTO prueba(name,departament,title,userAsigned,datebegin,dateend,contenido) VALUES (?,?,?,?,?,?,?)', [name,departament,title,userAsigned,datebegin,dateend,contenido], (err, rows, fields) => {
      mysqlConnection.query('INSERT INTO prueba SET ?', req.body, (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Usuario Registrado'});
      } else {
        console.log(err);
      }
    });
  
  });

module.exports = router;