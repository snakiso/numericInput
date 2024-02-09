import {ChangeEvent, useRef, useState} from "react";
import {NumericFormat} from "react-number-format";

type NumericInputProps = {
    callback: (num: string[]) => void
    currentNums: string[]
}

export const NumericInput = ({callback, currentNums}: NumericInputProps) => {
    const [value, setValue] = useState<string>('0.00')
    const [select, setSelect] = useState<number | null>(null)
    const inputRef = useRef<HTMLInputElement>(null);

    const onBlurHandler = () => {
        if (!value) {
            setValue('0.00')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        if (inputRef.current?.selectionStart === 0) {
            setSelect(0)
        } else {
            setSelect(null)
        }
    }


    const onKeyDownHandler = (e: React.KeyboardEvent) => {
        let firstValue = value.split('.')[0]
        if (e.key === "Enter") {
            if (firstValue.length === 1 && firstValue === '0') {
                callback([value, ...currentNums]);
            } else if (firstValue.length === 0) {
                callback([`0${value}`, ...currentNums]);
            } else {
                console.log(value)
                let newValue = value.replace(/^0+/, "");
                callback([newValue, ...currentNums]);
            }
        }
        if (e.key === 'ArrowLeft') {
            if (inputRef.current?.selectionStart === 1 || inputRef.current?.selectionStart === 0) {
                setSelect(0)
            } else (
                setSelect(null)
            )
        }
        if (e.key === 'ArrowRight') {
            setSelect(null)
        }
        if (e.key === 'Backspace') {
            if(inputRef.current?.selectionStart === 1 || inputRef.current?.selectionStart === 0){
                setSelect(0)
            }
            if(select === 0){
                inputRef.current?.setSelectionRange(select, 0)
            }
        }
        if (select === 0 && e.key !== 'Backspace'){
            setSelect(null)
        }
    }

    return (
        <NumericFormat value={value}
                       onValueChange={(values) => {
                           setValue(values.value)
                       }}
                       onClick={onClickHandler}
                       decimalScale={2}
                       fixedDecimalScale
                       onBlur={onBlurHandler}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       getInputRef={inputRef}
        />

    );
}

