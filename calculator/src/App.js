import React, { Component } from 'react';
import Result from './components/Results';
import Keypad from './components/Keypad'
import './App.css';


class App extends Component {

  constructor(){
  super();

  this.state = {
    result: ""
  }
  }

render(){

  return(

    <div>
    <div className="calculator">
          <h1> calculator </h1>
          <Result result={this.state.result}/>
          <Keypad onClick={this.onClick}/>
    </div>
    
    </div>
  )
}


}

















export default App;
