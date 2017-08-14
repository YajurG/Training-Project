var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "myDB"
});

var question_number = "dog"

function questionNumber(number){
  connection.query("SELECT * FROM questions LIMIT 1 OFFSET ?", (number - 1), function(err, results){
    if (err) throw err;
    question_number = results[0].question_id;
    console.log("Question " + question_number);
    return question_number
  })
}

questionNumber(3);
