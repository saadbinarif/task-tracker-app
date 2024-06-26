
import { format } from "date-fns";
import React from "react";
import { Controller } from 'react-hook-form';

interface TextInputProps {
    placeholderProp: string;
    nameProp: string;
    controlProp?: any;
    valueProp?: any
    errorProp?: string | undefined
    dateValue?: any
}

const DateInput: React.FC<TextInputProps> = ({ placeholderProp, nameProp, controlProp, errorProp, dateValue }) => {
    console.log(dateValue)
    return (
        <Controller
            name={nameProp}
            control={controlProp}
            defaultValue={dateValue}
            render={({ field }) => (
                <>
                <input 
                type='date' 
                placeholder={placeholderProp}
                className='border border-black rounded-sm text-sm'
                {...field} 
                 />
                <span className="text-red-500 text-sm mt-1 mb-6 ms-2">
                    {errorProp && <p>{errorProp}</p>}
                </span>
                
                </>
                

            )}

        />
    );
}

export default DateInput;
