import React, { Component } from '../node_modules/@types/react';
import Result from './components/Results';
import Keypad from './components/Keypad'
import './App.css'



class App extends Component {

  constructor(){
  super();

  this.state = {
    result: ""
  }
  }

  onClick = button => {

    if(button=== "="){
      this.calculation()
    }

    else if(button === "C"){
      this.reset()
    }

    else if(button === "CE"){
      this.delete()
    }

    else{
      this.setState({ result: this.state.result + button})
    }
  }

  calculation = () => {

    try{
      this.setState({
        result : (eval(this.state.result) || "") + ""
      })
    } catch(e){
      this.setState({ result: "error"})
    }
  }

    reset = () => {

      this.setState({result:""})
    }

    delete = () => {
      this.setState({ result: this.state.result.slice(0,-1)})
    }
render(){

  return(

    <div>
    <div className="Calculator">
          <h1> calculator </h1>
          <Result result={this.state.result}/>
          <Keypad onClick={this.onClick}/>
    </div>
    
    </div>
  )
}


}

















export default App;
