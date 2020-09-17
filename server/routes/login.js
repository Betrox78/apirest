const express = require('express');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mysqlConnection  = require('../database.js');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");


router.post('/login', (req, res) => {
const {name,nickname,email,password} = req.body;
    let body = req.body;
    mysqlConnection.query('SELECT * FROM usuarios WHERE email = ?', [body.email], (err, usuarioDB) => {


        if (err) {
          console.log(err);
            return res.status(500).json({
                ok: false,
                err
            });
        }
        console.log(usuarioDB);
        console.log("////////////////");
        console.log(body);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        console.log(compareSync(body.password, usuarioDB[0].password));
        if (body.password == usuarioDB[0].password ) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }
console.log("GG")
        let token = jwt.sign({
            Usuario: {
                id: body.id,
                nombre: body.name,
                password: body.password
            }
         }, process.env.SEED, {expiresIn: 60 * 60 * 24 * 30});
        res.status(200).send({token});
        console.log(token);
    });

});
module.exports = router;