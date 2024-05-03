
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { Controller, useFormContext } from 'react-hook-form';

interface PlainTextInputProps {
    placeHolderProp: string,
    fontSizeProp?: string | number
    nameProp?: string
    valueProp?: string | null
    controlProp?: any
    errorProp?: string
    changingVal?: any
}

const PlainTextInput: React.FC<PlainTextInputProps> = ({ placeHolderProp, fontSizeProp, nameProp = "dd", valueProp, controlProp, changingVal }) => {
    const [text, setText] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setText(event.target.value);

    };
    const allval = changingVal + valueProp
    useEffect(() => {
        const textArea = textAreaRef.current;
        if (textArea) {
            textArea.style.height = 'auto';
            textArea.style.height = `${textArea.scrollHeight}px`;
            
        }
    }, [changingVal]);



    const textareaStyle = `
    resize-none
    outline-none
    placeholder-black
    bg-transparent
    p-1
    w-full
    overflow-hidden
    overflow-Y-hidden
    mx-0
    my-0
    text-${fontSizeProp}
    
  `
    return (
        <Controller
            name={nameProp}
            control={controlProp}
            defaultValue={valueProp}

            render={({ field }) => (
                <textarea
                    placeholder={placeHolderProp}
                    rows={1}
                    className={textareaStyle}
                    {...field}
                    ref={textAreaRef}
                    onChange={(e) => {
                        field.onChange(e);
                        // Ensuring React Hook Form registers the change
                    }}
                
                />
            )}

        />

    )
}

export default PlainTextInput