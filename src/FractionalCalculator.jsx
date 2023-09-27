import React, { useState } from 'react';

function FractionalCalculator() {
    const [leftNumerator, setLeftNumerator] = useState(-3);
    const [leftDenominator, setLeftDenominator] = useState(4);
    const [rightNumerator, setRightNumerator] = useState(-5);
    const [rightDenominator, setRightDenominator] = useState(8);
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

    const findLCD = (denominators) => {
        let maxDenominator = Math.max(...denominators);
        let commonDenominator = maxDenominator;

        while (true) {
            let isCommon = true;
            for (let denominator of denominators) {
                if (commonDenominator % denominator !== 0) {
                    isCommon = false;
                    break;
                }
            }
            if (isCommon) break;
            commonDenominator += maxDenominator;
        }

        return commonDenominator;
    };



    const calculateResult = () => {
        const num1 = parseFloat(leftNumerator);
        const den1 = parseFloat(leftDenominator);
        const num2 = parseFloat(rightNumerator);
        const den2 = parseFloat(rightDenominator);

        if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2)) {
            setResult('Please enter valid numbers');
            setSteps([]);
        } else if (operation === '/' && num2 === 0) {
            setResult('Division by zero is not allowed');
            setSteps([]);
        } else {
            const denominators = [den1, den2];
            const lcd = findLCD(denominators);

            let stepsArray = [];

            stepsArray.push(`(${num1}/${den1})${operation}(${num2}/${den2}) = ?`);
            stepsArray.push(`Calculate the result:`);

            switch (operation) {
                case '+':
                    stepsArray.push(`${num1 * (lcd / den1) + num2 * (lcd / den2)} / ${lcd}`);
                    setResult((num1 * (lcd / den1) + num2 * (lcd / den2)) + '/' + lcd);
                    stepsArray.push(`LCD(${num1}/${den1},${num2}/${den2}) = ${lcd}`);
                    stepsArray.push(`\t(${num1} * ${lcd / den1} / ${den1} * ${lcd / den1}) ${operation} (${num2} * ${lcd / den2} / ${den2} * ${lcd / den2}) = ?`)
                    stepsArray.push(`\t${num1 * (lcd / den1)} / ${lcd} ${operation} ${num2 * (lcd / den2)} / ${lcd} = ?`);
                    stepsArray.push(`\t(${num1 * (lcd / den1)} ${operation} ${num2 * (lcd / den2)} )/ ${lcd} = ?`);
                    break;
                case '-':
                    stepsArray.push(`${num1 * (lcd / den1) - num2 * (lcd / den2)} / ${lcd}`);
                    setResult((num1 * (lcd / den1) - num2 * (lcd / den2)) + '/' + lcd);
                    stepsArray.push(`LCD(${num1}/${den1},${num2}/${den2}) = ${lcd}`);
                    stepsArray.push(`\t(${num1} * ${lcd / den1} / ${den1} * ${lcd / den1}) ${operation} (${num2} * ${lcd / den2} / ${den2} * ${lcd / den2}) = ?`)
                    stepsArray.push(`\t${num1 * (lcd / den1)} / ${lcd} ${operation} ${num2 * (lcd / den2)} / ${lcd} = ?`);
                    stepsArray.push(`\t(${num1 * (lcd / den1)} ${operation} ${num2 * (lcd / den2)} )/ ${lcd} = ?`);
                    break;
                case '*':
                    stepsArray.push(`${num1 * num2} / ${den1 * den2}`);
                    setResult((num1 * num2) + '/' + (den1 * den2));
                    stepsArray.push(`\t${num1}/${den1} * ${num2}/${den2} = ?`);
                    stepsArray.push(`\t${num1}*${num2} / ${den1}/${den2} = ${num1 * num2} / ${den1 * den2}`);
                    break;
                case '/':
                    stepsArray.push(`${num1 * den2} / ${den1 * num2}`);
                    setResult((num1 * den2) + '/' + (den1 * num2));
                    stepsArray.push(`\t${num1}/${den1} * ${den2}/${num2} = ?`);
                    stepsArray.push(`\t${num1}*${den2} / ${den1}*${num2} = ${num1 * den2} / ${den1 * num2}`);
                    break;
                default:
                    setResult('Invalid operation');
                    stepsArray = [];
            }

            setSteps(stepsArray);
        }
    };

    return (
        <div>
            <div className='flex'>
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
            <div>
                <p>Steps:</p>
                <ul>
                    {steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FractionalCalculator;
