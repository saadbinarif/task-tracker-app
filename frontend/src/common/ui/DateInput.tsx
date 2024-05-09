
import { format } from "date-fns";
import React from "react";
import { Controller } from 'react-hook-form';

interface TextInputProps {
    placeholderProp: string;
    nameProp: string;
    controlProp?: any;
    errorProp?: string | undefined
}

const DateInput: React.FC<TextInputProps> = ({ placeholderProp, nameProp, controlProp, errorProp }) => {
    return (
        <Controller
            name={nameProp}
            control={controlProp}
            render={({ field }) => (
                <>
                <input 
                type='date' 
                placeholder={placeholderProp}
                className='border border-black rounded-sm text-sm'
                {...field}
                onChange={(event) => {
                    const formattedDate = format(new Date(event.target.value), 'MM/dd/yyyy');
                    field.onChange(nameProp, formattedDate);
                }}
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
