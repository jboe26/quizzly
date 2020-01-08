import React, { Component } from '../../node_modules/@types/react'

class Result extends Component {

    render(){
        
        let { result } = this.props;
        return (
            <div className="result">
            <p>{result}</p>
            </div>
        )
    }
}
export default Result;  