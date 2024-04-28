import React, { useState, ChangeEvent, useEffect, useRef } from "react";

interface PlainTextInputProps{
    placeHolderProp: string,
    fontSizeProp?: string | number

}

const PlainTextInput: React.FC<PlainTextInputProps> = ({placeHolderProp, fontSizeProp}) => {
    const [text, setText] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setText(event.target.value);
    };

    useEffect(() => {
        const textArea = textAreaRef.current;
        if (textArea) {
            textArea.style.height = 'auto';
            textArea.style.height = `${textArea.scrollHeight}px`;
        }
    }, [text]);

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
        
        <textarea
            placeholder={placeHolderProp}
            value={text}
            rows={1}
            className={textareaStyle}
            onChange={handleChange}
            ref={textAreaRef}
        />
        

    )
}

export default PlainTextInput