const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: '198.71.56.217',
  port: 3306,
  user: 'betrox',
  password: 'Reynordico78$?',
  database: 'Apis_',
  multipleStatements: true
});

 mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
}); 

module.exports = mysqlConnection;