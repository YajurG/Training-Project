var express = require('express');
var mysql = require('mysql');
var path = require('path');
var async = require('async')
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "myDB"
})

app.set('port', 3001);

var questions = [];
var question_ids = [];
var answers = [];
var answer_ids = []

app.get('/training/:user_type/:user_id', function (req, res) {
  var user_type = req.params.user_type // gets the value for the named parameter user_id from the url
  var user_id = req.params.user_id
  var sql_command_1 = "SELECT * FROM questions q LEFT JOIN answers a ON q.question_id = a.question_id WHERE q.type = ?"
  var sql_command_2 = "SELECT * FROM answers WHERE question_id = ?"
  var sql_command_3 = "SELECT * FROM users WHERE user_id = ? "

    /*connection.query(sql_command_1, user_type, function (error, results) {
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
})*/

function getResults(){
  return new Promise((resolve, reject) => {
    connection.query(sql_command_3, user_id, function(error, results){
      console.log(results)
      var user_name = results[0].name

    connection.query(sql_command_1, user_type, function (error, results){
      for (var i = 0; i < results.length; i++){
        if (questions.indexOf(results[i].question_text) == -1){
          questions.push(results[i].question_text)
        };
        if (question_ids.indexOf(results[i].question_id) == -1){
          question_ids.push(results[i].question_id)
        };
        if (answers.indexOf(results[i].answer_text) == -1){
          answers.push(results[i].answer_text);
      }
        if (answer_ids.indexOf(results[i].answer_id) == -1){
          answer_ids.push(results[i].answer_id);
      }
        else {
          console.log('All results have been recieved')
          break
        }
    }
      resolve(res.json({"Name": user_name, "ID": user_id, "Type": user_type, "Questions": questions, "Answers": answers}))
    })
   })
  })
}

function getQuestions(){  // old function using query for each result
  return new Promise((resolve, reject) => {
    connection.query(sql_command_1, user_type, function (error, results) {
      for (var i = 0; i < results.length; i++){
        questions.push(results[i].question_text);
        question_ids.push(results[i].question_id);
      }
      resolve({questions: questions, question_ids: question_ids})
    })
  })
}

function getAnswers(question_ids){ // old function using query for each result
  console.log(question_ids)

  var promises = []

    for (i = 0; i < question_ids.length; i++){
      promise = new Promise((resolve, reject) => {
        connection.query(sql_command_2, question_ids[i], function(error, results){
          for (j = 0; j < results.length; j++){
            answers.push(results[j].answer_text);
            answer_ids.push(results[j].answer_id)
          }
          resolve()
        })
      })
      promises.push(promise)
    }
    return Promise.all(promises)

  }

  /*return new Promise((resolve, reject) => {
    for (i = 0; i < question_ids.length; i++){
      connection.query(sql_command_2, question_ids[i], function(error, results){
      for (j = 0; j < results.length; j++){
        answers.push(results[j].answer_text);
        answer_ids.push(results[j].answer_id)
      }
      if (answer_ids.length == (4 * question_ids.length)){
        console.log(answers)
        console.log(answer_ids)
        resolve({answers: answers, answer_ids: answer_ids})
    }

    })
   }
  }
)}*/


  /*getQuestions().then((result) => {
    console.log(result)
    return getAnswers(result.question_ids)}).then((result) => {
      res.json({"Type": user_type, "Questions": questions, "Answers": answers})
    })*/
  getResults()

    })

  app.post('/training/submit', function(req, res){
    var data = req.body;
    console.log(data)
    res.end('success')
  })



//use two functions for each query//

app.listen(3001)
