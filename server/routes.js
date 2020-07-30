// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;

//usar libreria got y express

// let connect = require("config/dbConnection");

const express = require('express');
let app = express();

exports.createServer = () =>{
    let server = app.listen(3000, function () {
        const port = server.address().port;
        console.log("Example app listening at http://localhost:" + port)

        // connect.connect()
    })
}

app.get('/', function (req, res) {
    res.send('Hello World');
})
app.get('/time', function (req, res) {
    let date = new Date();
    res.send(date.getDate().toString());
})

// exports.createServer = () => {
//
//     const server = http.createServer(function(req, res) {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'JSON');
//         let url = req.url;
//
//         if(url ==='/about') {
//             res.write(' Welcome to about us page');
//             res.end();
//         }
//         else if(url ==='/contact') {
//             res.write(' Welcome to contact us page');
//             res.end();
//         }
//         else {
//             connect.connect()
//             res.write('Hello World!');
//             res.end();
//         }
//     });
//
//     server.listen(port, hostname, function() {
//         console.log('Server running at http://'+ hostname + ':' + port + '/');
//     });
// }