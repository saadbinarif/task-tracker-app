
import React from "react";
import { Controller } from 'react-hook-form';

interface TextInputProps {
    placeholderProp: string;
    autoCompleteProp?: string
    nameProp: string;
    controlProp?: any;
    errorProp?: string | undefined
    onFocus?: ()=>void
    onBlur?: () => void;
}
// e: React.FocusEvent<HTMLInputElement>
const TextInput: React.FC<TextInputProps> = ({ placeholderProp, autoCompleteProp ="on", nameProp, controlProp, errorProp, onFocus, onBlur }) => {
    return (
        <Controller
            name={nameProp}
            control={controlProp}
            render={({ field }) => (
                <>
                <input
                    
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    placeholder={placeholderProp}
                    autoComplete={autoCompleteProp}
                    {...field}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    
                />
                <span className="text-red-500 text-sm mt-1 mb-6 ms-2">
                    {errorProp && <p>{errorProp}</p>}
                </span>
                
                </>

            )}


        />
    );
}

export default TextInput;
