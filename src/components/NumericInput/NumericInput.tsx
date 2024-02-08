import {ChangeEvent, useState} from "react";
import {keyboardKey} from "@testing-library/user-event";

type NumericInputProps = {
    callback: (num: string[]) => void
    currentNums: string[]
}

export const NumericInput = ({callback, currentNums}: NumericInputProps) => {
    const [value, setValue] = useState('');

    const valueSplitByDot = value.split('.')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;

        const regex = /^\d+(\.\d{0,2})?$/;
        if (inputValue === '' || regex.test(inputValue)) {
            setValue(inputValue);
        }
    };

    const onKeyDownHandler = (e: keyboardKey) => {
        if (e.key === 'Enter') {
            if (!value.includes('.') || valueSplitByDot.length === 2) {
                callback([Number(value).toFixed(2), ...currentNums])
                setValue('')
            } else if (valueSplitByDot[1].length === 1) {
                callback([(value + '0'), ...currentNums])
                setValue('')
            } else {
                callback([value, ...currentNums])
                setValue('')
            }
        }
    }

    const onBlurHandler = () => {
        if (value && !value.includes('.')) {
            setValue(prev => prev + '.00')
        } else if (value && valueSplitByDot[1].length === 1) {
            setValue(prev => prev + '0')
        } else if (valueSplitByDot.length === 2 && valueSplitByDot[1] === '') {
            setValue(prev => prev + '00')
        }
    }

    return (
        <input
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={onKeyDownHandler}
            onBlur={onBlurHandler}
            placeholder="Введите число типа 0.00"
        />
    );
};
