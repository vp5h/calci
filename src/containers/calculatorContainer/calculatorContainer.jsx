import React, {Component} from 'react';
import './calculatorContainer.css';
import {MathInDegree, factorial, enterKeyCodeCharacter, removeExtraDecimalsInStrings} from '../utility';
import {calculatorKeysArray, calculatorKeysArrayInverse} from '../../calculatorInputButtons/calculatorInputButtons';

class CalculatorContainer extends Component {
    state = {
        calculatorKeysArray,
        calculatorKeysArrayInverse,
        displayedCharacters: '',
        trigsAreInverse: false,
        trigIsDegree: true,
        calculatorIsOn: true,
        error: false
    }

    componentDidMount() {
        document.addEventListener('keypress', this.displayedCharactersHandler);
        // document.addEventListener('keydown', this.displayedCharactersHandler);
    }

    componentWillUnmount() {
        // document.removeEventListener('keydown', this.displayedCharactersHandler);
        document.removeEventListener('keypress', this.displayedCharactersHandler);
    }

    getBtnChar = (event) => {
        event = event || window.event;
        let charCode = event.keyCode || event.which;
        let charStr = String.fromCharCode(charCode);
        return charStr;
    }

    displayedCharactersHandler = (event) => {
        try {
            let {displayedCharacters, trigIsDegree, calculatorIsOn} = this.state;

            const operatorsRegex = /[+-/*%]/;
            let {value: eventTargetValue} = event.target;

            // change X to * for evaluating multiplication and 'MOD' for modulus
            // eslint-disable-next-line
            eventTargetValue = eventTargetValue == 'X'
                ? '*'
                // eslint-disable-next-line
                : eventTargetValue == 'MOD'
                    ? '%'
                    : eventTargetValue;

            if (event.keyCode && calculatorIsOn) {
                eventTargetValue = this.getBtnChar();
            }

            // dont allow more than 40 characters in the display
            if (displayedCharacters.length >= 40) {
                displayedCharacters = displayedCharacters.slice(0, -1);
            }
            switch (eventTargetValue) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '.':
                    // disallow multiple zeros starting
                    displayedCharacters = displayedCharacters === '0' && eventTargetValue !== '.'
                        ? ''
                        : displayedCharacters;

                    let updatedButtonValues = displayedCharacters + eventTargetValue;
                    updatedButtonValues = removeExtraDecimalsInStrings(updatedButtonValues);
                    this.setState({displayedCharacters: updatedButtonValues});
                    break;

                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    let updatedOperationChars = displayedCharacters + eventTargetValue;
                    let lastChar = displayedCharacters
                        .toString()
                        .slice(-1);
                    if (operatorsRegex.test(lastChar)) {
                        updatedOperationChars = displayedCharacters
                            .toString()
                            .slice(0, -1) + eventTargetValue;
                    }
                    this.setState({displayedCharacters: updatedOperationChars});
                    break;

                case 'CLR':
                    this.setState({displayedCharacters: '0', calculatorIsOn: true});
                    break;

                case 'COS':
                    let cosResult = trigIsDegree
                        ? MathInDegree.cos(displayedCharacters)
                        : Math.cos(displayedCharacters);
                    this.setState({displayedCharacters: cosResult});
                    break;

                case 'SIN':
                    let sinResult = trigIsDegree
                        ? MathInDegree.sin(displayedCharacters)
                        : Math.sin(displayedCharacters);
                    this.setState({displayedCharacters: sinResult});
                    break;

                case 'TAN':
                    let tanResult = trigIsDegree
                        ? MathInDegree.tan(displayedCharacters)
                        : Math.tan(displayedCharacters);
                    this.setState({displayedCharacters: tanResult});
                    break;

                case 'ACOS':
                    let acosResult = trigIsDegree
                        ? MathInDegree.acos(displayedCharacters)
                        : Math.acos(displayedCharacters);
                    this.setState({displayedCharacters: acosResult});
                    break;

                case 'ASIN':
                    let asinResult = trigIsDegree
                        ? MathInDegree.asin(displayedCharacters)
                        : Math.asin(displayedCharacters);
                    this.setState({displayedCharacters: asinResult});
                    break;

                case 'ATAN':
                    let atanResult = trigIsDegree
                        ? MathInDegree.atan(displayedCharacters)
                        : Math.atan(displayedCharacters);
                    this.setState({displayedCharacters: atanResult});
                    break;

                case 'OFF':
                    this.setState({displayedCharacters: '', calculatorIsOn: false});
                    break;

                case 'DEL':
                case 'D':
                case 'd':
                    let updatedValue;
                    updatedValue = displayedCharacters.length > 1
                        ? displayedCharacters
                            .toString()
                            .slice(0, -1)
                        : '0';

                    this.setState({displayedCharacters: updatedValue});
                    break;

                case '(':
                case ')':
                    displayedCharacters = displayedCharacters === '0' && eventTargetValue === '('
                        ? ''
                        : displayedCharacters;
                    this.setState({
                        displayedCharacters: displayedCharacters + eventTargetValue
                    });
                    break;

                case '=':
                case enterKeyCodeCharacter:
                    // eslint-disable-next-line
                    this.setState({displayedCharacters: eval(displayedCharacters), evaluated: true});
                    break;
                case 'π':
                    let pi = Math
                        .PI
                        .toFixed(2);
                    if (/\D$/.test(displayedCharacters)) {
                        this.setState({
                            displayedCharacters: displayedCharacters + pi.toString()
                        });
                    } else {
                        this.setState({
                            displayedCharacters: pi.toString()
                        });
                    };
                    break;
                case '±':
                    this.setState({
                        displayedCharacters: -displayedCharacters
                    });
                    break;
                case 'ABS':
                    this.setState({
                        displayedCharacters: Math.abs(displayedCharacters)
                    });
                    break;

                case '√':
                    this.setState({
                        displayedCharacters: Math.sqrt(displayedCharacters)
                    });
                    break;

                case 'SQR':
                    this.setState({
                        displayedCharacters: Math.pow(displayedCharacters, 2)
                    });
                    break;

                case '^':
                    this.setState({
                        displayedCharacters: displayedCharacters + '**'
                    });
                    break;

                case 'LOG':
                    this.setState({
                        displayedCharacters: Math.log10(displayedCharacters)
                    });
                    break;

                case 'In':
                    let E = Math
                        .E
                        .toFixed(2)
                        .toString();
                    if (/\D$/.test(displayedCharacters)) {
                        this.setState({
                            displayedCharacters: displayedCharacters + E
                        })
                        // eslint-disable-next-line
                    } else if (displayedCharacters == '0') {
                        this.setState({displayedCharacters: E})
                    }
                    break;

                case 'n!':
                    this.setState({displayedCharacters: factorial(displayedCharacters)});
                    break;

                case 'EXP':
                    this.setState({
                        displayedCharacters: Math.exp(displayedCharacters)
                    });
                    break;
                default:
                    this.setState({displayedCharacters: displayedCharacters});

            }
        } catch (error) {
            this.setState({displayedCharacters: error, error: true, calculatorIsOn: false})
        }
    }

    toggleHypHandler = () => {
        this.setState({
            trigsAreInverse: !this.state.trigsAreInverse
        })
    }

    toggleDegreeRadanHandler = () => {
        this.setState({
            trigIsDegree: !this.state.trigIsDegree
        })
    }

    render() {
        const {calculatorIsOn, calculatorKeysArray, calculatorKeysArrayInverse, trigsAreInverse} = this.state;
        let calculatorKeys = trigsAreInverse
            ? calculatorKeysArrayInverse
            : calculatorKeysArray

        calculatorKeys = calculatorKeys.map((calcKey) => (
            <span key={calcKey.id}>
                <input
                    disabled={calcKey.btnCharacter === 'CLR'
                    ? false
                    : !calculatorIsOn}
                    onClick={this.displayedCharactersHandler}
                    className={`button ${calcKey.buttonColor}`}
                    type="button"
                    id={calcKey.id}
                    value={calcKey.btnCharacter}/></span>
        ));

        // change font size of display dynamicaly. if there is error, make it smaller,
        // so, it can e big enough to contain the error messages, otherwise, keep the
        // default

        let displayFont = this.state.error
            ? '15px'
            : ''
        return (
            <div className='container'>

                <div className='calculatorScreen'>
                    <div
                        id='display'
                        style={{
                        fontSize: displayFont
                    }}>
                        {this
                            .state
                            .displayedCharacters
                            .toString()
                            .replace(/\*\*/g, '^')
                            .replace(/\*/g, '×')
                            .replace(/-/g, '−')}
                    </div>

                </div>

                <div className='extraKeys'>
                    <button onClick={this.toggleHypHandler}>2nd</button>
                    <button onClick={this.toggleDegreeRadanHandler}>{this.state.trigIsDegree
                            ? 'DEG'
                            : 'RAD'}</button>
                </div>

                <div id='buttons'>{calculatorKeys}</div>
            </div>

        );
    }
}

export default CalculatorContainer;
