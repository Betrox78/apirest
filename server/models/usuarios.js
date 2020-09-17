const mysqlConnection  = require('../database.js');

const Usuarios = mysqlConnection.extend({
    tableName: 'usuarios'
})

module.exports = Usuarios;