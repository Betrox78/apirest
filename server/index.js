require('./config/config');

const express = require('express');
const app = express();
const multer = require ('multer');
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const path = require('path');


const { comprobarTocken } = require('./middlewares/token');

console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/img/uploads'),
    filename: (req, file, cb) =>{
        cb(null, uuid() + path.extname(file.originalname));
    }
});

// parse application/x-www-form-urlencoded
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));

// Midelware
app.use(multer({
    storage: storage,
    dest : 'images',
    fileFilter: (req, file, cb) =>{
        const filetypes = /jpeg|jpg|png|PNG/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
           return cb(null, true)
        }
        cb("Error: Archivo no soportado")
    }
}).single('image'));

//rutas 
//  app.use(require('./routes/tikects'));
 app.use(require('./routes/usuarios'));
 app.use(require('./routes/productos'));
 app.use(require('./routes/prueba'));
 app.use(require('./routes/login'));
//  app.get('/pruebas/token', (req, res) => {
//     let token = jwt.sign({
//         Usuario: {
//             id: "00001",
//             nombre: "Mario Alberto"
//         }
//      }, process.env.SEED, {expiresIn: 60 * 60 * 24 * 30});
//     res.status(200).send({token});
//  });

 app.get('/pruebas/leerTocken', [comprobarTocken], (req, res) => {
     console.log(req.body);
    res.status(201).send({ok: true});
 });

// parse application/json

//app.use(bodyParser.json())


// Start

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});