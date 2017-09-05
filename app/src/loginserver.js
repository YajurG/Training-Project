var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "myDB"
})

var query = "SELECT * FROM users WHERE username = ? AND passw"

app.use('/training', expressJwt({secret: secret}))

app.use(express.json())
app.use(express.urlencoded())

app.post('/authenticate', function(req, res){
  connection.query()
})
