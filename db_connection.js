var mysql = require('mysql');
var path = require('path');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "myDB"
});

var sql_command = "SELECT * FROM questions q LEFT JOIN answers a ON q.question_id = a.question_id WHERE q.type = ?";

function getQuestionNumber(number){
  connection.query("SELECT * FROM questions LIMIT 1 OFFSET ?", (number - 1), function(err, results){
    if (err) throw err;
    question_number = results[0].question_id;
    console.log("Question " + question_number);
    return question_number
  })
}


var users_data = [
  ["agent", "John Smith"],
  ["doctor", "Jack Foley"],
  ["agent", "Bob Stookey"],
  ["paramedic", "Ethan Hunt"],
  ["doctor", "Reggie Jackson"],
  ["agent", "Frank Costello"],
  ["paramedic", "Bruce Wayne"],
  ["doctor", "Michael Fox"],
  ["agent", "Brian jackson"],
  ["paramedic", "Adrian Holmes"]
];
var questions_data = [
  ["agent", "What is the average person's heartbeat?"],
  ["doctor", "How do you check the temperature of a patient?"],
  ["paramedic", "How many bones are in the human body?"]
];

var answers_data = [
  [4, 'Patient has a cough'],
  [4, 'Patient has fever'],
  [4, 'All of the above'],
]



connection.query(sql_command, answers_data, function(err, result){
  if (err) throw err;
  console.log(result);
});

/*connection.query("SELECT * FROM questions", function(err, result){
  if (err) throw err;
  console.log(result);
});*/

/*connection.query('SELECT * FROM answers', function(err, result){
  if (err) throw err;
  console.log(result);
});*/ 
