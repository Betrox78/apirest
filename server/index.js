require('./config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));

//rutas
 app.use(require('./routes/tikects'));
 app.use(require('./routes/usuarios'));
 app.use(require('./routes/prueba'));
// parse application/json

//app.use(bodyParser.json())


// Start

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});