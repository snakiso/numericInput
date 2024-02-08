import {ChangeEvent, useState} from "react";

const NumericInput = () => {
    const [value, setValue] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;

        // Проверка на ввод только цифр с двумя нулями после точки
        const regex = /^\d+(\.\d{0,2})?$/;
        if (inputValue === '' || regex.test(inputValue)) {
            setValue(inputValue);
        }
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder="Введите число"
        />
    );
};
