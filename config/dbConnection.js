const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'tp1',
    insecureAuth: true
});

exports.connect = function () {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Sql connected!");
    });
};

exports.close = function () {
    connection.end();
    console.log("Sql disconnected!");
}
