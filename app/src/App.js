import React, {Component} from 'react';
import './App.css';
import {Grid, Row, Col, Button, Radio} from 'react-bootstrap';


class App extends Component {

  constructor(props){
      super(props);
      localStorage.clear()
      if (localStorage.length === 0){
      this.state={
        data:null,
        questionNumber: 1,
        userAnswers: [],
        selectedAnswer: null,
        dataSubmitted: false
      }
    }
      else{
        this.state={
          data: JSON.parse(localStorage.getItem('data')),
          questionNumber: parseInt(localStorage.getItem('questionNumber')),
          userAnswers: JSON.parse(localStorage.getItem('userAnswers')),
          selectedAnswer: null,
          dataSubmitted: Boolean(localStorage.getItem('dataSubmitted'))
        }
      }
      console.log(this.state)
      console.log(localStorage)
  }

  componentDidMount(){
    //fetch call to server
    const url = "/training/doctor/2"
    fetch(url)
    .then((response) =>{
      console.log(response);
      return response.json()
    })
      .then((data)=>{
          console.log(data);
          localStorage.setItem('data', JSON.stringify(data))
          this.setState({
            data:data
          })
          console.log(this.state)
        }
       )
      .catch((err) => console.log(err))

  }

  getNextPage(){
    if(!this.state.selectedAnswer){
      alert('Please select an answer.')
    }
    else if(this.state.questionNumber < this.state.data.Questions.length && this.state.questionNumber > 0){
      localStorage.setItem('questionNumber', this.state.questionNumber + 1);
      this.setState({questionNumber: this.state.questionNumber + 1})
      this.state.userAnswers.push(this.state.selectedAnswer)
      localStorage.setItem('userAnswers', JSON.stringify(this.state.userAnswers));
      console.log(localStorage);
      console.log(this.state)
    }
  }

  getPreviousPage(){
    if(this.state.questionNumber <= this.state.data.Questions.length && this.state.questionNumber > 1){
      localStorage.setItem('questionNumber', this.state.questionNumber - 1);
      this.setState({questionNumber: this.state.questionNumber - 1})
      this.state.userAnswers.pop()
      localStorage.setItem('userAnswers', JSON.stringify(this.state.userAnswers));
      console.log(localStorage);
      console.log(this.state)
    }
  }

  handleAnswerChange(changeEvent){
    console.log(changeEvent.target.value)
    this.setState({selectedAnswer: changeEvent.target.value})
    console.log(this.state)
  }

  handleSubmit(event){
    event.preventDefault();
    if(!this.state.selectedAnswer){
      alert('Please select an answer.')
    }
    else if (this.state.selectedAnswer){
    this.state.userAnswers.push(this.state.selectedAnswer);
    localStorage.setItem('userAnswers', JSON.stringify(this.state.userAnswers));
    fetch('/training/submit', {
      method: 'POST',
      body: {
        'user_id': this.state.data.ID,
        'user_name': this.state.data.Name,
        'answers': this.state.userAnswers
      }
    }).then((response) => {
      //console.log(response.json())
      return response.json();
    }).then((body) => {
      console.log('jiefjenfejw')
      console.log(body)
    })
    localStorage.setItem('dataSubmitted', true);
    alert('Please refresh the page to see your answers');
    console.log(localStorage);
    console.log(this.state)
  }

  }

  render() {

    if(!this.state.data)
      return(
        <div> Loading... </div>
      );


      const data = this.state.data;
      const questionNumber = this.state.questionNumber
      const selectedAnswer = this.state.selectedAnswer
      const userAnswers = this.state.userAnswers

      const question = (
        <Grid>
          <Row>
            Question {questionNumber}: {data.Questions[questionNumber-1]}
          </Row>
        </Grid>
      )

      const answers = (
        <Grid>
          <Row>
            <Radio name="answerChoice" checked={selectedAnswer === data.Answers[((4*questionNumber)-3)-1]}
            value= {data.Answers[((4*questionNumber)-3)-1]} onChange={this.handleAnswerChange.bind(this)}>
            {data.Answers[((4*questionNumber)-3)-1]} </Radio>
          </Row>
          <Row>
            <Radio name="answerChoice" checked={selectedAnswer === data.Answers[((4*questionNumber)-2)-1]}
            value= {data.Answers[((4*questionNumber)-2)-1]} onChange={this.handleAnswerChange.bind(this)}>
            {data.Answers[((4*questionNumber)-2)-1]} </Radio>
          </Row>
          <Row>
            <Radio name="answerChoice" checked={selectedAnswer === data.Answers[((4*questionNumber)-1)-1]}
            value= {data.Answers[((4*questionNumber)-1)-1]} onChange={this.handleAnswerChange.bind(this)}>
            {data.Answers[((4*questionNumber)-1)-1]} </Radio>
          </Row>
          <Row>
            <Radio name="answerChoice" checked={selectedAnswer === data.Answers[(4*questionNumber)-1]}
            value= {data.Answers[(4*questionNumber)-1]} onChange={this.handleAnswerChange.bind(this)}>
            {data.Answers[(4*questionNumber)-1]} </Radio>
          </Row>
        </Grid>
      )

      const next = (
        <Grid>
          <Row>
            <Button bsStyle="primary" onClick={() => {this.getNextPage()}}>Next</Button>
          </Row>
        </Grid>
      )

      const previous = (
          <Grid>
            <Row>
              <Button bsStyle="primary" onClick={() => {this.getPreviousPage()}}>Previous</Button>
            </Row>
          </Grid>
        )

      const submit = (
        <Grid>
          <Row>
            <Button bsStyle="primary" onClick={(event) => {this.handleSubmit(event)}}>Submit</Button>
          </Row>
        </Grid>
      )

    if(userAnswers.length === data.Questions.length-1){
      return (
        <div>
          <div className="App-title">
            Training for {data.Type}
          </div>
          <div className="App">
            <div>
              {question}
            </div>
          </div>
          <div className="App">
            {answers}
          </div>
          <div className="App">
            {previous}
          </div>
          <div className="App">
            {submit}
          </div>
        </div>
      )
    }

    if(userAnswers.length === 0){
      return (
        <div>
          <div className="App-title">
            Training for {data.Type}
          </div>
          <div className="App">
            <div>
              {question}
            </div>
          </div>
          <div className="App">
            {answers}
          </div>
          <div className="App">
            {next}
          </div>
        </div>
      )
    }

    if(userAnswers.length === this.state.data.Questions.length){
      return (
        <div>
          Answers for {this.state.data.Name}:
          <ol>
            {
              userAnswers.map((answer) => {
              return (
              <li>
                {answer}
              </li>
            )})
          }
          </ol>
        </div>
      )
    }



    return (
      <div>
        <div className="App-title">
          Training for {data.Type}
        </div>
        <div className="App">
          <div>
            {question}
          </div>
        </div>
        <div className="App">
          {answers}
        </div>
        <div className="App">
          {next}
          {previous}
        </div>
      </div>


    );
  }
}

export default App;
