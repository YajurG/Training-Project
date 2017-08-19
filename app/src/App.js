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
      return response.json()
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



    return (
      <div>
        <div className="App-header">
            <div>
              Hello!
            </div>
        </div>
        <div className="App">
          <div>
            {data}
          </div>
          <div>
            Thank you!
          </div>
        </div>
      </div>


    );
  }
}

export default App;
