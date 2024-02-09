import {ChangeEvent, useState} from "react";
import {NumericFormat} from "react-number-format";
import {keyboardKey} from "@testing-library/user-event";

type NumericInputProps = {
    callback: (num: string[]) => void
    currentNums: string[]
}

export const NumericInput = ({callback, currentNums}: NumericInputProps) => {
    const [value, setValue] = useState<string>('0.00')

    const onBlurHandler = () => {
        if (!value) {
            setValue('0.00')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    const onKeyDownHandler = (e: keyboardKey) => {
        let firstValue = value.split('.')[0]
        if (e.key === "Enter") {
            if (firstValue.length === 1 && firstValue === '0') {
                callback([value, ...currentNums]);
            } else {
                let newValue = value.replace(/^0+/, "");
                callback([newValue, ...currentNums]);
            }
        }
    }

    return (
        <NumericFormat value={value}
                       onValueChange={(values) => {
                           setValue(values.value)
                       }}
                       decimalScale={2}
                       fixedDecimalScale
                       onBlur={onBlurHandler}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
    );
}

