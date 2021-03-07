import React, {Component} from 'react';
import './App.css';
import CalculatorContainer from './containers/calculatorContainer/calculatorContainer';


class App extends Component {
  render() {
    return (
     <div>
       
        <CalculatorContainer/>
        <br></br>
        <p>You can also use your keyboard. Delete with key 'D'
          <br></br>, Evaluate with Enter Key.</p>
        
      </div>
      
    );
  }
}

export default App;
