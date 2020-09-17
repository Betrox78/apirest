const express = require('express');
const router = express.Router();
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

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

router.post('/Registrar', (req, res) => {
  const {name,nickname,email,password} = req.body;
  
  const body = req.body;
  console.log(req);
  console.log(res);
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
 
  // mysqlConnection.query('INSERT INTO tiket(name,departament,title,userAsigned,datebegin,dateend,contenido) VALUES (?,?,?,?,?,?,?)', [name,departament,title,userAsigned,datebegin,dateend,contenido], (err, rows, fields) => {
    mysqlConnection.query('INSERT INTO usuarios SET ?', req.body, (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Usuario Registrado'});
    } else {
      console.log(err);
    }
  });

});


////////////////////////////////////////////////////////////////////////////////////////////
//                                D O N A T E L L O                                       //
////////////////////////////////////////////////////////////////////////////////////////////

router.post('/Registrard', (req, res) => {
  const {name,nickname,email,password} = req.body;
  const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
 
  // mysqlConnection.query('INSERT INTO tiket(name,departament,title,userAsigned,datebegin,dateend,contenido) VALUES (?,?,?,?,?,?,?)', [name,departament,title,userAsigned,datebegin,dateend,contenido], (err, rows, fields) => {
    mysqlConnection.query('INSERT INTO UsuariosDonatello SET ?', req.body, (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Usuario Registrado'});
    } else {
      console.log(err);
    }
  });

});



// router.get('/users', (req, res) => {
//   mysqlConnection.query('SELECT * FROM UsuariosDonatello', (err, rows, fields) => {
//     if(!err) {
//       res.json(rows);
//     } else {
//       console.log(err);
//     }
//   });  
// }) ; 

module.exports = router;