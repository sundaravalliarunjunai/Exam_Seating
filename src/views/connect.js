const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const conn = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'exam_hall_setting'
});

const app = express();

app.get('/adminlogin', function (req, res) {

    connection.getConnection(function (err, connection) {

    connection.query('SELECT * FROM adminlogin', function (error, results, fields) {

      if (error) throw error;

      res.send(results)
    });
  });
});

app.listen(3000, () => {
 console.log('Go to http://localhost:3000/adminlogin so you can see the data.');
});