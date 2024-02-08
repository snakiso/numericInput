import React, {useState} from 'react';
import './App.css';
import {NumericInput} from "./components/NumericInput/NumericInput";

function App() {
    const [numbersForRender, setNumbersForRender] = useState<string[]>([])
    return (
        <div className="App">
            <h2>Введите число и нажмите enter</h2>
            <NumericInput currentNums={numbersForRender} callback={(num) => setNumbersForRender(num)}/>
            <div className={'nums'}>
                <h4>числа которые вы вводили</h4>
                {numbersForRender.map((num, index) => {
                    return (
                        <span key={index}>{num}</span>
                    )
                })}
            </div>
        </div>
    );
}

export default App;
