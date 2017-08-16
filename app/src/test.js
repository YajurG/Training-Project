var express = require('express');
var mysql = require('mysql');
var path = require('path');
var async = require('async')

var app = express();

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "myDB"
})

app.set('port', 3001);

var questions = []
var question_ids = []
var answers = [];
var answer_ids = [];
var questionsAdded = 0


app.get('/training/:user_type', function (req, res) {
  var user_type = req.params.user_type // gets the value for the named parameter user_id from the url
  var sql_command_1 = "SELECT * FROM questions WHERE type = ?"
  var sql_command_2 = "SELECT * FROM answers WHERE question_id = ?"

    connection.query(sql_command_1, user_type, function (error, results) {
      async.forEachSeries(results, function(value, callback){
        questions.push(value.question_text);
        question_ids.push(value.question_id);
        callback()
      })

      async.forEachOfSeries(question_ids, function(value, index, callback){
        connection.query(sql_command_2, question_ids[index], function(error, results){
          async.forEachSeries(results, function(value, callback){
            answers.push(value.answer_text);
            answer_ids.push(value.answer_id)
            callback()
          })
          callback()
        })
      })
    })
    res.json({"Type": user_type, "Questions": questions, "Answers": answers})
})




app.listen(app.get('port'))
