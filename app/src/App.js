import React, {Component} from 'react';
import './App.css';
import {Grid, Row, Col, Button, Radio} from 'react-bootstrap';


class App extends Component {

  constructor(props){
      super(props);
      this.state={
        data:null,
        pageComplete: false,
        questionNumber: 0
      }
  }

  componentDidMount(){
    //fetch call to server
    const url = "/training/doctor"
    fetch(url)
    .then((response) =>{
      console.log(response);
      response.json()
    })
      .then((data)=>{
          console.log(data);
          this.setState({
            data:data
          })
        }
       )
      .catch((err) => console.log(err))

  }


  pageCompleted(){
    this.setState({pageComplete: true})
  }




  render() {

    if(!this.state.data)
      return(
        <div> Loading... </div>
      );


      const data = this.state.data;
      const userName = (
        <Grid>
          <Row>
            <Col xs={12} md={8}> User: {data.User} </Col>
          </Row>
        </Grid>
      )

      const test = (
        <Grid>
          <Row>
            <Col xs={6} md={6}> {data.Question} </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}> <Radio name="answerChoice" checked="true" inline> A: {data.Answer.A} </Radio> </Col>
            <Col xs={6} md={6}> <Radio name="answerChoice" inline>  B: {data.Answer.B} </Radio> </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}> <Radio name="answerChoice" inline> C: {data.Answer.C} </Radio> </Col>
            <Col xs={6} md={6}> <Radio name="answerChoice" inline>  D: {data.Answer.D} </Radio> </Col>
          </Row>
        </Grid>
      )

    const button = (
      <Button bsStyle="primary"> Next Question </Button>
    )



    return (
      <div>
        <div className="App-header">
            <div>
              {userName}
            </div>
        </div>
        <div className="App">
          <div>
            {test}
          </div>
          <div>
            {button}
          </div>
        </div>
      </div>


    );
  }
}

export default App;
