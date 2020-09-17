const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../database.js');

router.post('/upload', (req, res) => {
    const img  = "/img/uploads/" + req.file.filename;
     console.log(img);
    res.send('Upload');
});

router.get('/productos', (req, res) => {
  mysqlConnection.query('SELECT * FROM DonatelloProductos', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
}) ; 


router.post('/Nuevoproducto', (req, res) => {
  console.log(req.body)
    const {name,price,content,stock} = req.body;
    const image  = "/img/uploads/" + req.file.filename;
     console.log(image);
     console.log(req.body)
    mysqlConnection.query('INSERT INTO DonatelloProductos(name,price,image,content,stock) VALUES (?,?,?,?,?)', [name,price,image,content,stock], (err, rows, fields) => {
        if(!err) {
          console.log(req.body)
          res.json({status: 'Producto Registrado'});
        } else {
          console.log(req.body)
          console.log(err);
        }
      });
});


module.exports = router;