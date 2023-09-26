import React, { useState } from 'react';

function FractionalCalculator() {
    const [leftNumerator, setLeftNumerator] = useState('');
    const [leftDenominator, setLeftDenominator] = useState('');
    const [rightNumerator, setRightNumerator] = useState('');
    const [rightDenominator, setRightDenominator] = useState('');
    const [operation, setOperation] = useState('+');
    const [result, setResult] = useState('');
    const [steps, setSteps] = useState([]);

    const handleLeftNumeratorChange = (e) => {
        setLeftNumerator(e.target.value);
    };

    const handleLeftDenominatorChange = (e) => {
        setLeftDenominator(e.target.value);
    };

    const handleRightNumeratorChange = (e) => {
        setRightNumerator(e.target.value);
    };

    const handleRightDenominatorChange = (e) => {
        setRightDenominator(e.target.value);
    };

    const handleOperationChange = (e) => {
        setOperation(e.target.value);
    };

    const calculateResult = () => {
        const num1 = parseFloat(leftNumerator);
        const den1 = parseFloat(leftDenominator);
        const num2 = parseFloat(rightNumerator);
        const den2 = parseFloat(rightDenominator);

        if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2)) {
            setResult('Please enter valid numbers');
        } else if (operation === '/' && num2 === 0) {
            setResult('Division by zero is not allowed');
        } else {
            switch (operation) {
                case '+':
                    setResult((num1 * den2 + num2 * den1) + '/' + (den1 * den2));
                    break;
                case '-':
                    setResult((num1 * den2 - num2 * den1) + '/' + (den1 * den2));
                    break;
                case '*':
                    setResult((num1 * num2) + '/' + (den1 * den2));
                    break;
                case '/':
                    setResult((num1 * den2) + '/' + (den1 * num2));
                    break;
                default:
                    setResult('Invalid operation');
            }
        }
    };

    return (
        <div className='flex bg-red'>
            <div>
                <input
                    type="text"
                    className='border border-black mb-2'
                    value={leftNumerator}
                    onChange={handleLeftNumeratorChange}
                    placeholder="Left numerator"
                />
                <div className='h-[1px] w-200 bg-black'></div>
                <input
                    type="text"
                    className='border border-black mt-2'
                    value={leftDenominator}
                    onChange={handleLeftDenominatorChange}
                    placeholder="Left denominator"
                />
            </div>
            <select value={operation} onChange={handleOperationChange}>
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
            <div>
                <input
                    className='border border-black mb-2'
                    type="text"
                    value={rightNumerator}
                    onChange={handleRightNumeratorChange}
                    placeholder="Right numerator"
                />
                <div className='h-[1px] w-200 bg-black'></div>
                <input
                    className='border border-black mt-2'
                    type="text"
                    value={rightDenominator}
                    onChange={handleRightDenominatorChange}
                    placeholder="Right denominator"
                />
            </div>
            <button onClick={calculateResult}>Calculate</button>
            <div>{result}</div>
        </div>
    );
}

export default FractionalCalculator;
